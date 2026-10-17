-- TALVIORA TECH: Adaptive roadmap engine (additive; apply after schema.sql).
-- Does not alter existing profile, assessment, interview, task, or bookmark rows.
BEGIN;

CREATE TABLE IF NOT EXISTS public.learning_pathways (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE CHECK (slug ~ '^[a-z0-9][a-z0-9_-]{1,79}$'),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  default_language TEXT NOT NULL DEFAULT 'en',
  content_version TEXT NOT NULL DEFAULT '1.0.0',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE CHECK (slug ~ '^[a-z0-9][a-z0-9_-]{1,99}$'),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  difficulty_level TEXT NOT NULL CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
  estimated_effort_minutes INTEGER NOT NULL CHECK (estimated_effort_minutes BETWEEN 1 AND 100000),
  mastery_threshold SMALLINT NOT NULL DEFAULT 90 CHECK (mastery_threshold BETWEEN 1 AND 100),
  learning_objectives TEXT[] NOT NULL DEFAULT '{}',
  completion_criteria TEXT[] NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  content_version TEXT NOT NULL DEFAULT '1.0.0',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.learning_pathway_skills (
  pathway_id UUID NOT NULL REFERENCES public.learning_pathways(id) ON DELETE CASCADE,
  skill_id UUID NOT NULL REFERENCES public.skills(id) ON DELETE RESTRICT,
  sequence_hint INTEGER NOT NULL CHECK (sequence_hint > 0),
  is_target_skill BOOLEAN NOT NULL DEFAULT FALSE,
  PRIMARY KEY (pathway_id, skill_id),
  UNIQUE (pathway_id, sequence_hint)
);

CREATE TABLE IF NOT EXISTS public.skill_dependencies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  skill_id UUID NOT NULL REFERENCES public.skills(id) ON DELETE CASCADE,
  prerequisite_skill_id UUID NOT NULL REFERENCES public.skills(id) ON DELETE RESTRICT,
  dependency_type TEXT NOT NULL CHECK (dependency_type IN ('required', 'recommended')),
  minimum_mastery_threshold SMALLINT CHECK (minimum_mastery_threshold BETWEEN 0 AND 100),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (skill_id, prerequisite_skill_id),
  CHECK (skill_id <> prerequisite_skill_id)
);
CREATE INDEX IF NOT EXISTS idx_skill_dependencies_prerequisite
  ON public.skill_dependencies(prerequisite_skill_id);

CREATE TABLE IF NOT EXISTS public.learning_resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  skill_id UUID NOT NULL REFERENCES public.skills(id) ON DELETE CASCADE,
  slug TEXT NOT NULL,
  title TEXT NOT NULL,
  resource_type TEXT NOT NULL CHECK (resource_type IN ('lesson', 'documentation', 'video', 'exercise', 'project', 'quiz')),
  description TEXT NOT NULL,
  content_markdown TEXT,
  url TEXT CHECK (url IS NULL OR url ~ '^https?://'),
  provider TEXT,
  language TEXT NOT NULL DEFAULT 'en',
  access_type TEXT NOT NULL DEFAULT 'unknown' CHECK (access_type IN ('free', 'freemium', 'paid', 'unknown')),
  verification_status TEXT NOT NULL DEFAULT 'unverified' CHECK (verification_status IN ('unverified', 'link_checked', 'not_applicable')),
  last_verified_at TIMESTAMPTZ,
  estimated_minutes INTEGER CHECK (estimated_minutes IS NULL OR estimated_minutes BETWEEN 1 AND 100000),
  completion_criteria TEXT[] NOT NULL DEFAULT '{}',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (skill_id, slug)
);
CREATE INDEX IF NOT EXISTS idx_learning_resources_skill
  ON public.learning_resources(skill_id, sort_order);

CREATE TABLE IF NOT EXISTS public.learner_profiles (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  primary_pathway_id UUID REFERENCES public.learning_pathways(id) ON DELETE SET NULL,
  target_role TEXT,
  target_country TEXT CHECK (target_country IS NULL OR target_country ~ '^[A-Z]{2}$'),
  preferred_language TEXT NOT NULL DEFAULT 'en',
  weekly_study_minutes INTEGER NOT NULL DEFAULT 300 CHECK (weekly_study_minutes BETWEEN 30 AND 2400),
  experience_level TEXT NOT NULL DEFAULT 'beginner' CHECK (experience_level IN ('beginner', 'junior', 'intermediate', 'senior')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.learner_skill_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  skill_id UUID NOT NULL REFERENCES public.skills(id) ON DELETE RESTRICT,
  status TEXT NOT NULL DEFAULT 'not_started'
    CHECK (status IN ('not_started', 'in_progress', 'practice_required', 'completed', 'mastered')),
  self_reported_level SMALLINT CHECK (self_reported_level BETWEEN 0 AND 100),
  mastery_score SMALLINT CHECK (mastery_score BETWEEN 0 AND 100),
  assessment_count INTEGER NOT NULL DEFAULT 0 CHECK (assessment_count >= 0),
  last_activity_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  evidence_summary TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, skill_id)
);
CREATE INDEX IF NOT EXISTS idx_learner_skill_progress_user
  ON public.learner_skill_progress(user_id, status);

CREATE TABLE IF NOT EXISTS public.roadmaps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  pathway_id UUID NOT NULL REFERENCES public.learning_pathways(id) ON DELETE RESTRICT,
  version INTEGER NOT NULL CHECK (version > 0),
  status TEXT NOT NULL CHECK (status IN ('active', 'superseded', 'completed', 'archived')),
  previous_roadmap_id UUID REFERENCES public.roadmaps(id) ON DELETE SET NULL,
  algorithm_version TEXT NOT NULL,
  generation_reason TEXT NOT NULL,
  weekly_study_minutes INTEGER NOT NULL CHECK (weekly_study_minutes BETWEEN 30 AND 2400),
  total_learning_minutes INTEGER NOT NULL CHECK (total_learning_minutes >= 0),
  estimated_total_minutes INTEGER NOT NULL CHECK (estimated_total_minutes >= 0),
  estimated_duration_weeks INTEGER NOT NULL CHECK (estimated_duration_weeks >= 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, pathway_id, version)
);
CREATE UNIQUE INDEX IF NOT EXISTS idx_roadmaps_one_active_per_pathway
  ON public.roadmaps(user_id, pathway_id) WHERE status = 'active';
CREATE INDEX IF NOT EXISTS idx_roadmaps_user_created
  ON public.roadmaps(user_id, created_at DESC);

CREATE TABLE IF NOT EXISTS public.roadmap_steps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  roadmap_id UUID NOT NULL REFERENCES public.roadmaps(id) ON DELETE CASCADE,
  skill_id UUID NOT NULL REFERENCES public.skills(id) ON DELETE RESTRICT,
  sequence_number INTEGER NOT NULL CHECK (sequence_number > 0),
  status TEXT NOT NULL DEFAULT 'not_started'
    CHECK (status IN ('not_started', 'in_progress', 'practice_required', 'completed', 'mastered')),
  estimated_minutes INTEGER NOT NULL CHECK (estimated_minutes > 0),
  skill_snapshot JSONB NOT NULL DEFAULT '{}'::jsonb CHECK (jsonb_typeof(skill_snapshot) = 'object'),
  completion_criteria TEXT[] NOT NULL DEFAULT '{}',
  prerequisites_snapshot JSONB NOT NULL DEFAULT '[]'::jsonb CHECK (jsonb_typeof(prerequisites_snapshot) = 'array'),
  activities_snapshot JSONB NOT NULL DEFAULT '[]'::jsonb CHECK (jsonb_typeof(activities_snapshot) = 'array'),
  recommended_reason TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (roadmap_id, skill_id),
  UNIQUE (roadmap_id, sequence_number)
);
CREATE INDEX IF NOT EXISTS idx_roadmap_steps_roadmap
  ON public.roadmap_steps(roadmap_id, sequence_number);

-- Correct answers are intentionally private. Clients can only obtain a safe
-- question projection from get_roadmap_assessment().
CREATE TABLE IF NOT EXISTS public.skill_assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  skill_id UUID NOT NULL REFERENCES public.skills(id) ON DELETE CASCADE,
  version INTEGER NOT NULL CHECK (version > 0),
  title TEXT NOT NULL,
  questions JSONB NOT NULL CHECK (jsonb_typeof(questions) = 'array'),
  passing_score SMALLINT NOT NULL CHECK (passing_score BETWEEN 1 AND 100),
  mastery_threshold SMALLINT NOT NULL CHECK (mastery_threshold BETWEEN passing_score AND 100),
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (skill_id, version)
);

CREATE TABLE IF NOT EXISTS public.assessment_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  skill_id UUID NOT NULL REFERENCES public.skills(id) ON DELETE RESTRICT,
  roadmap_id UUID NOT NULL REFERENCES public.roadmaps(id) ON DELETE CASCADE,
  roadmap_step_id UUID NOT NULL REFERENCES public.roadmap_steps(id) ON DELETE CASCADE,
  assessment_version INTEGER NOT NULL,
  score SMALLINT NOT NULL CHECK (score BETWEEN 0 AND 100),
  result JSONB NOT NULL,
  attempt_number INTEGER NOT NULL CHECK (attempt_number > 0),
  client_event_id UUID NOT NULL,
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, client_event_id)
);
CREATE INDEX IF NOT EXISTS idx_assessment_attempts_owner_skill
  ON public.assessment_attempts(user_id, skill_id, submitted_at DESC);

CREATE TABLE IF NOT EXISTS public.roadmap_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  roadmap_id UUID NOT NULL REFERENCES public.roadmaps(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  previous_version INTEGER,
  new_version INTEGER,
  reason TEXT NOT NULL,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_roadmap_events_owner
  ON public.roadmap_events(user_id, created_at DESC);
CREATE UNIQUE INDEX IF NOT EXISTS idx_roadmap_events_assessment_idempotency
  ON public.roadmap_events(user_id, event_type, (metadata->>'assessment_attempt_id'))
  WHERE event_type IN ('roadmap_adapted', 'adaptation_reviewed');

-- Public content is readable only after publication. Learner-owned data is
-- private and has no direct client write policy; mutation goes through checked RPCs.
ALTER TABLE public.learning_pathways ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_pathway_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skill_dependencies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learner_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learner_skill_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.roadmaps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.roadmap_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skill_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessment_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.roadmap_events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Published pathways are readable" ON public.learning_pathways;
CREATE POLICY "Published pathways are readable" ON public.learning_pathways
  FOR SELECT TO anon, authenticated USING (status = 'published');
DROP POLICY IF EXISTS "Published skills are readable" ON public.skills;
CREATE POLICY "Published skills are readable" ON public.skills
  FOR SELECT TO anon, authenticated USING (status = 'published');
DROP POLICY IF EXISTS "Published pathway skills are readable" ON public.learning_pathway_skills;
CREATE POLICY "Published pathway skills are readable" ON public.learning_pathway_skills
  FOR SELECT TO anon, authenticated USING (
    EXISTS (SELECT 1 FROM public.learning_pathways p WHERE p.id = pathway_id AND p.status = 'published')
    AND EXISTS (SELECT 1 FROM public.skills s WHERE s.id = skill_id AND s.status = 'published')
  );
DROP POLICY IF EXISTS "Published skill dependencies are readable" ON public.skill_dependencies;
CREATE POLICY "Published skill dependencies are readable" ON public.skill_dependencies
  FOR SELECT TO anon, authenticated USING (
    EXISTS (SELECT 1 FROM public.skills s WHERE s.id = skill_id AND s.status = 'published')
    AND EXISTS (SELECT 1 FROM public.skills p WHERE p.id = prerequisite_skill_id AND p.status = 'published')
  );
DROP POLICY IF EXISTS "Published learning resources are readable" ON public.learning_resources;
CREATE POLICY "Published learning resources are readable" ON public.learning_resources
  FOR SELECT TO anon, authenticated USING (
    EXISTS (SELECT 1 FROM public.skills s WHERE s.id = skill_id AND s.status = 'published')
  );

DROP POLICY IF EXISTS "Owners can read learner learning profiles" ON public.learner_profiles;
CREATE POLICY "Owners can read learner learning profiles" ON public.learner_profiles
  FOR SELECT TO authenticated USING (user_id = auth.uid());
DROP POLICY IF EXISTS "Owners can read skill progress" ON public.learner_skill_progress;
CREATE POLICY "Owners can read skill progress" ON public.learner_skill_progress
  FOR SELECT TO authenticated USING (user_id = auth.uid());
DROP POLICY IF EXISTS "Owners can read roadmaps" ON public.roadmaps;
CREATE POLICY "Owners can read roadmaps" ON public.roadmaps
  FOR SELECT TO authenticated USING (user_id = auth.uid());
DROP POLICY IF EXISTS "Owners can read roadmap steps" ON public.roadmap_steps;
CREATE POLICY "Owners can read roadmap steps" ON public.roadmap_steps
  FOR SELECT TO authenticated USING (
    EXISTS (SELECT 1 FROM public.roadmaps r WHERE r.id = roadmap_id AND r.user_id = auth.uid())
  );
DROP POLICY IF EXISTS "Owners can read assessment attempts" ON public.assessment_attempts;
CREATE POLICY "Owners can read assessment attempts" ON public.assessment_attempts
  FOR SELECT TO authenticated USING (user_id = auth.uid());
DROP POLICY IF EXISTS "Owners can read roadmap events" ON public.roadmap_events;
CREATE POLICY "Owners can read roadmap events" ON public.roadmap_events
  FOR SELECT TO authenticated USING (user_id = auth.uid());
-- No client SELECT policy is defined for skill_assessments.

REVOKE ALL ON public.learning_pathways, public.skills, public.learning_pathway_skills,
  public.skill_dependencies, public.learning_resources, public.learner_profiles,
  public.learner_skill_progress, public.roadmaps, public.roadmap_steps,
  public.skill_assessments, public.assessment_attempts, public.roadmap_events
  FROM PUBLIC, anon, authenticated;
GRANT SELECT ON public.learning_pathways, public.skills, public.learning_pathway_skills,
  public.skill_dependencies, public.learning_resources TO anon, authenticated;
GRANT SELECT ON public.learner_profiles, public.learner_skill_progress, public.roadmaps,
  public.roadmap_steps, public.assessment_attempts, public.roadmap_events TO authenticated;

CREATE OR REPLACE FUNCTION public.create_learning_roadmap(
  p_goal_slug TEXT,
  p_weekly_study_minutes INTEGER,
  p_experience_level TEXT,
  p_preferred_language TEXT,
  p_target_country TEXT,
  p_algorithm_version TEXT,
  p_generation_reason TEXT,
  p_total_learning_minutes INTEGER,
  p_estimated_total_minutes INTEGER,
  p_estimated_duration_weeks INTEGER,
  p_steps JSONB,
  p_request_id UUID,
  p_previous_roadmap_id UUID DEFAULT NULL,
  p_assessment_attempt_id UUID DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_user_id UUID := auth.uid();
  v_pathway public.learning_pathways%ROWTYPE;
  v_previous public.roadmaps%ROWTYPE;
  v_roadmap public.roadmaps%ROWTYPE;
  v_existing public.roadmaps%ROWTYPE;
  v_step JSONB;
  v_edge RECORD;
  v_sequence INTEGER;
  v_version INTEGER;
  v_status TEXT;
  v_skill_id UUID;
  v_prerequisite_id UUID;
  v_skill_snapshot JSONB;
  v_threshold INTEGER;
  v_completed BOOLEAN;
  v_skill_effort INTEGER;
  v_computed_total INTEGER := 0;
BEGIN
  IF v_user_id IS NULL THEN RAISE EXCEPTION 'AUTH_REQUIRED' USING ERRCODE = '28000'; END IF;
  IF p_weekly_study_minutes IS NULL OR p_weekly_study_minutes NOT BETWEEN 30 AND 2400 THEN
    RAISE EXCEPTION 'INVALID_STUDY_TIME' USING ERRCODE = '22023';
  END IF;
  IF p_steps IS NULL OR jsonb_typeof(p_steps) IS DISTINCT FROM 'array' THEN
    RAISE EXCEPTION 'INVALID_ROADMAP_STEPS' USING ERRCODE = '22023';
  END IF;
  IF jsonb_array_length(p_steps) > 100 THEN
    RAISE EXCEPTION 'INVALID_ROADMAP_STEPS' USING ERRCODE = '22023';
  END IF;
  IF p_algorithm_version IS DISTINCT FROM '1.0.0' THEN
    RAISE EXCEPTION 'UNSUPPORTED_ALGORITHM_VERSION' USING ERRCODE = '22023';
  END IF;
  IF p_request_id IS NULL THEN RAISE EXCEPTION 'REQUEST_ID_REQUIRED' USING ERRCODE = '22023'; END IF;
  IF p_experience_level IS NULL OR p_experience_level NOT IN ('beginner', 'junior', 'intermediate', 'senior') THEN
    RAISE EXCEPTION 'INVALID_EXPERIENCE_LEVEL' USING ERRCODE = '22023';
  END IF;
  IF p_target_country IS NOT NULL AND p_target_country !~ '^[A-Z]{2}$' THEN
    RAISE EXCEPTION 'INVALID_COUNTRY' USING ERRCODE = '22023';
  END IF;
  IF length(COALESCE(p_preferred_language, 'en')) > 16 THEN RAISE EXCEPTION 'INVALID_LANGUAGE' USING ERRCODE = '22023'; END IF;

  -- Idempotent retry for an already committed create/adapt request.
  IF p_assessment_attempt_id IS NOT NULL THEN
    SELECT r.* INTO v_existing
      FROM public.roadmap_events e
      JOIN public.roadmaps r ON r.id = e.roadmap_id
      WHERE e.user_id = v_user_id AND e.event_type = 'roadmap_adapted'
        AND e.metadata->>'assessment_attempt_id' = p_assessment_attempt_id::TEXT
      LIMIT 1;
    IF FOUND THEN
      RETURN jsonb_build_object('roadmapId', v_existing.id, 'version', v_existing.version,
        'status', v_existing.status, 'goal', p_goal_slug,
        'estimatedDurationWeeks', v_existing.estimated_duration_weeks,
        'algorithmVersion', v_existing.algorithm_version, 'idempotentReplay', TRUE);
    END IF;
  ELSE
    SELECT r.* INTO v_existing
      FROM public.roadmap_events e
      JOIN public.roadmaps r ON r.id = e.roadmap_id
      WHERE e.user_id = v_user_id AND e.event_type = 'roadmap_created'
        AND e.metadata->>'request_id' = p_request_id::TEXT
      LIMIT 1;
    IF FOUND THEN
      RETURN jsonb_build_object('roadmapId', v_existing.id, 'version', v_existing.version,
        'status', v_existing.status, 'goal', p_goal_slug,
        'estimatedDurationWeeks', v_existing.estimated_duration_weeks,
        'algorithmVersion', v_existing.algorithm_version, 'idempotentReplay', TRUE);
    END IF;
  END IF;

  SELECT * INTO v_pathway FROM public.learning_pathways
    WHERE slug = p_goal_slug AND status = 'published';
  IF NOT FOUND THEN RAISE EXCEPTION 'UNSUPPORTED_GOAL' USING ERRCODE = 'P0002'; END IF;

  -- Only include skills in the required prerequisite closure of the pathway's
  -- target skills. This protects the public authenticated RPC from forged plans.
  IF EXISTS (
    SELECT 1
    FROM jsonb_array_elements(p_steps) submitted(value)
    WHERE NOT EXISTS (
      WITH RECURSIVE required_skill(skill_id) AS (
        SELECT ps.skill_id FROM public.learning_pathway_skills ps
        WHERE ps.pathway_id = v_pathway.id AND ps.is_target_skill
        UNION
        SELECT d.prerequisite_skill_id
        FROM required_skill rs
        JOIN public.skill_dependencies d ON d.skill_id = rs.skill_id AND d.dependency_type = 'required'
      )
      SELECT 1 FROM required_skill
      WHERE skill_id = NULLIF(submitted.value->>'skillId', '')::UUID
    )
  ) THEN RAISE EXCEPTION 'UNRELATED_STEP_SKILL' USING ERRCODE = '22023'; END IF;

  -- The supplied plan must not omit a target unless saved assessment evidence
  -- already demonstrates its mastery threshold.
  IF EXISTS (
    SELECT 1
    FROM public.learning_pathway_skills target
    JOIN public.skills target_skill ON target_skill.id = target.skill_id
    WHERE target.pathway_id = v_pathway.id AND target.is_target_skill
      AND NOT EXISTS (
        SELECT 1 FROM jsonb_array_elements(p_steps) submitted(value)
        WHERE NULLIF(submitted.value->>'skillId', '')::UUID = target.skill_id
      )
      AND NOT EXISTS (
        SELECT 1 FROM public.learner_skill_progress lp
        WHERE lp.user_id = v_user_id AND lp.skill_id = target.skill_id
          AND lp.status = 'mastered' AND lp.mastery_score >= target_skill.mastery_threshold
      )
  ) THEN RAISE EXCEPTION 'TARGET_SKILL_MISSING' USING ERRCODE = '22023'; END IF;

  IF p_previous_roadmap_id IS NOT NULL THEN
    SELECT * INTO v_previous FROM public.roadmaps
      WHERE id = p_previous_roadmap_id AND user_id = v_user_id AND status = 'active'
      FOR UPDATE;
    IF NOT FOUND OR v_previous.pathway_id <> v_pathway.id THEN
      RAISE EXCEPTION 'ACTIVE_ROADMAP_NOT_FOUND' USING ERRCODE = 'P0002';
    END IF;
    IF p_assessment_attempt_id IS NULL OR NOT EXISTS (
      SELECT 1 FROM public.assessment_attempts a
      WHERE a.id = p_assessment_attempt_id AND a.user_id = v_user_id
        AND a.roadmap_id = v_previous.id AND (a.result->>'mastered')::BOOLEAN IS TRUE
    ) THEN RAISE EXCEPTION 'MASTERY_EVIDENCE_REQUIRED' USING ERRCODE = '42501'; END IF;
    v_version := v_previous.version + 1;
  ELSE
    IF EXISTS (SELECT 1 FROM public.roadmaps r WHERE r.user_id = v_user_id
      AND r.pathway_id = v_pathway.id AND r.status = 'active') THEN
      RAISE EXCEPTION 'ACTIVE_ROADMAP_EXISTS' USING ERRCODE = '23505';
    END IF;
    SELECT COALESCE(MAX(version), 0) + 1 INTO v_version FROM public.roadmaps
      WHERE user_id = v_user_id AND pathway_id = v_pathway.id;
  END IF;

  IF jsonb_array_length(p_steps) = 0 AND p_previous_roadmap_id IS NULL THEN
    RAISE EXCEPTION 'GOAL_ALREADY_MET' USING ERRCODE = 'P0001';
  END IF;

  INSERT INTO public.learner_profiles (
    user_id, primary_pathway_id, preferred_language, target_country,
    weekly_study_minutes, experience_level, updated_at
  ) VALUES (
    v_user_id, v_pathway.id, COALESCE(NULLIF(p_preferred_language, ''), 'en'), p_target_country,
    p_weekly_study_minutes, p_experience_level, NOW()
  ) ON CONFLICT (user_id) DO UPDATE SET
    primary_pathway_id = EXCLUDED.primary_pathway_id,
    preferred_language = EXCLUDED.preferred_language,
    target_country = EXCLUDED.target_country,
    weekly_study_minutes = EXCLUDED.weekly_study_minutes,
    experience_level = EXCLUDED.experience_level,
    updated_at = NOW();

  IF p_previous_roadmap_id IS NOT NULL THEN
    UPDATE public.roadmaps SET status = 'superseded', updated_at = NOW() WHERE id = v_previous.id;
  END IF;

  INSERT INTO public.roadmaps (
    user_id, pathway_id, version, status, previous_roadmap_id, algorithm_version,
    generation_reason, weekly_study_minutes, total_learning_minutes,
    estimated_total_minutes, estimated_duration_weeks
  ) VALUES (
    v_user_id, v_pathway.id, v_version,
    CASE WHEN jsonb_array_length(p_steps) = 0 THEN 'completed' ELSE 'active' END,
    p_previous_roadmap_id, p_algorithm_version,
    left(COALESCE(p_generation_reason, 'Generated from the published skill pathway.'), 500),
    p_weekly_study_minutes, p_total_learning_minutes, p_estimated_total_minutes,
    p_estimated_duration_weeks
  ) RETURNING * INTO v_roadmap;

  v_sequence := 0;
  FOR v_step IN SELECT value FROM jsonb_array_elements(p_steps) LOOP
    v_sequence := v_sequence + 1;
    v_skill_id := NULLIF(v_step->>'skillId', '')::UUID;
    IF v_skill_id IS NULL OR NOT EXISTS (
      SELECT 1 FROM public.learning_pathway_skills ps
      JOIN public.skills s ON s.id = ps.skill_id
      WHERE ps.pathway_id = v_pathway.id AND ps.skill_id = v_skill_id AND s.status = 'published'
    ) THEN RAISE EXCEPTION 'STEP_SKILL_NOT_IN_PATHWAY' USING ERRCODE = '22023'; END IF;
    SELECT estimated_effort_minutes, jsonb_build_object(
      'slug', slug, 'name', name, 'description', description,
      'learningObjectives', learning_objectives, 'contentVersion', content_version
    ) INTO v_skill_effort, v_skill_snapshot
      FROM public.skills WHERE id = v_skill_id;
    IF (v_step->>'estimatedMinutes')::INTEGER IS DISTINCT FROM v_skill_effort THEN
      RAISE EXCEPTION 'INVALID_STEP_EFFORT' USING ERRCODE = '22023';
    END IF;
    v_computed_total := v_computed_total + v_skill_effort;
    IF (v_step->>'sequenceNumber')::INTEGER <> v_sequence THEN
      RAISE EXCEPTION 'INVALID_STEP_ORDER' USING ERRCODE = '22023';
    END IF;
    IF jsonb_typeof(v_step->'completionCriteria') IS DISTINCT FROM 'array'
      OR jsonb_typeof(v_step->'prerequisites') IS DISTINCT FROM 'array'
      OR jsonb_typeof(v_step->'activities') IS DISTINCT FROM 'array' THEN
      RAISE EXCEPTION 'INVALID_STEP_CONTENT' USING ERRCODE = '22023';
    END IF;
    -- Never trust a client-supplied progress status, even through this RPC.
    SELECT lp.status INTO v_status FROM public.learner_skill_progress lp
      WHERE lp.user_id = v_user_id AND lp.skill_id = v_skill_id;
    IF NOT FOUND THEN v_status := 'not_started'; END IF;
    IF v_status NOT IN ('not_started', 'in_progress', 'practice_required', 'completed', 'mastered') THEN
      RAISE EXCEPTION 'INVALID_STEP_STATUS' USING ERRCODE = '22023';
    END IF;

    FOR v_edge IN SELECT prerequisite_skill_id, minimum_mastery_threshold
      FROM public.skill_dependencies WHERE skill_id = v_skill_id AND dependency_type = 'required'
    LOOP
      SELECT COALESCE(v_edge.minimum_mastery_threshold, s.mastery_threshold) INTO v_threshold
        FROM public.skills s WHERE s.id = v_edge.prerequisite_skill_id;
      SELECT EXISTS (
        SELECT 1 FROM jsonb_array_elements(p_steps) prior(value)
        WHERE (prior.value->>'skillId')::UUID = v_edge.prerequisite_skill_id
          AND (prior.value->>'sequenceNumber')::INTEGER < v_sequence
      ) OR EXISTS (
        SELECT 1 FROM public.learner_skill_progress lp
        WHERE lp.user_id = v_user_id AND lp.skill_id = v_edge.prerequisite_skill_id
          AND lp.status IN ('completed', 'mastered') AND lp.mastery_score >= v_threshold
      ) INTO v_completed;
      IF NOT v_completed THEN RAISE EXCEPTION 'REQUIRED_PREREQUISITE_MISSING' USING ERRCODE = '22023'; END IF;
    END LOOP;

    INSERT INTO public.roadmap_steps (
      roadmap_id, skill_id, sequence_number, status, estimated_minutes,
      skill_snapshot, completion_criteria, prerequisites_snapshot, activities_snapshot, recommended_reason
    ) VALUES (
      v_roadmap.id, v_skill_id, v_sequence, v_status,
      (v_step->>'estimatedMinutes')::INTEGER,
      v_skill_snapshot, ARRAY(SELECT jsonb_array_elements_text(v_step->'completionCriteria')),
      v_step->'prerequisites', v_step->'activities', left(COALESCE(v_step->>'recommendedReason', ''), 1000)
    );
  END LOOP;

  IF p_total_learning_minutes IS DISTINCT FROM v_computed_total
    OR p_estimated_total_minutes IS DISTINCT FROM CEIL(v_computed_total * 1.2)::INTEGER
    OR p_estimated_duration_weeks IS DISTINCT FROM CASE
      WHEN v_computed_total = 0 THEN 0
      ELSE CEIL(CEIL(v_computed_total * 1.2)::NUMERIC / p_weekly_study_minutes)::INTEGER
    END THEN
    RAISE EXCEPTION 'INVALID_ROADMAP_ESTIMATE' USING ERRCODE = '22023';
  END IF;

  IF p_previous_roadmap_id IS NOT NULL THEN
    INSERT INTO public.roadmap_events (
      user_id, roadmap_id, event_type, previous_version, new_version, reason, metadata
    ) VALUES (
      v_user_id, v_roadmap.id, 'roadmap_adapted', v_previous.version, v_roadmap.version,
      left(COALESCE(p_generation_reason, 'Updated from assessment evidence.'), 500),
      jsonb_build_object('assessment_attempt_id', p_assessment_attempt_id::TEXT)
    );
  ELSE
    INSERT INTO public.roadmap_events (
      user_id, roadmap_id, event_type, new_version, reason, metadata
    ) VALUES (
      v_user_id, v_roadmap.id, 'roadmap_created', v_roadmap.version,
      left(COALESCE(p_generation_reason, 'Generated from the published skill pathway.'), 500),
      jsonb_build_object('request_id', p_request_id::TEXT)
    );
  END IF;

  RETURN jsonb_build_object(
    'roadmapId', v_roadmap.id, 'version', v_roadmap.version, 'status', v_roadmap.status,
    'goal', v_pathway.slug, 'estimatedDurationWeeks', v_roadmap.estimated_duration_weeks,
    'algorithmVersion', v_roadmap.algorithm_version, 'idempotentReplay', FALSE
  );
END;
$$;

CREATE OR REPLACE FUNCTION public.start_roadmap_step(p_roadmap_id UUID, p_step_id UUID)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_user_id UUID := auth.uid();
  v_step public.roadmap_steps%ROWTYPE;
  v_roadmap public.roadmaps%ROWTYPE;
  v_dependency RECORD;
  v_threshold INTEGER;
BEGIN
  IF v_user_id IS NULL THEN RAISE EXCEPTION 'AUTH_REQUIRED' USING ERRCODE = '28000'; END IF;
  SELECT * INTO v_roadmap FROM public.roadmaps
    WHERE id = p_roadmap_id AND user_id = v_user_id AND status = 'active' FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'ROADMAP_NOT_FOUND' USING ERRCODE = 'P0002'; END IF;
  SELECT * INTO v_step FROM public.roadmap_steps
    WHERE id = p_step_id AND roadmap_id = v_roadmap.id FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'STEP_NOT_FOUND' USING ERRCODE = 'P0002'; END IF;
  IF v_step.status IN ('completed', 'mastered') THEN
    RETURN jsonb_build_object('stepId', v_step.id, 'status', v_step.status, 'alreadyComplete', TRUE);
  END IF;

  FOR v_dependency IN SELECT d.prerequisite_skill_id, d.minimum_mastery_threshold, s.mastery_threshold
    FROM public.skill_dependencies d JOIN public.skills s ON s.id = d.prerequisite_skill_id
    WHERE d.skill_id = v_step.skill_id AND d.dependency_type = 'required'
  LOOP
    v_threshold := COALESCE(v_dependency.minimum_mastery_threshold, v_dependency.mastery_threshold);
    IF NOT EXISTS (
      SELECT 1 FROM public.learner_skill_progress lp
      WHERE lp.user_id = v_user_id AND lp.skill_id = v_dependency.prerequisite_skill_id
        AND lp.status IN ('completed', 'mastered') AND lp.mastery_score >= v_threshold
    ) THEN RAISE EXCEPTION 'REQUIRED_PREREQUISITE_NOT_MET' USING ERRCODE = '42501'; END IF;
  END LOOP;

  UPDATE public.roadmap_steps SET status = 'in_progress', updated_at = NOW()
    WHERE id = v_step.id AND status <> 'in_progress';
  INSERT INTO public.learner_skill_progress (user_id, skill_id, status, last_activity_at, updated_at)
    VALUES (v_user_id, v_step.skill_id, 'in_progress', NOW(), NOW())
    ON CONFLICT (user_id, skill_id) DO UPDATE SET
      status = CASE WHEN public.learner_skill_progress.status IN ('completed', 'mastered')
        THEN public.learner_skill_progress.status ELSE 'in_progress' END,
      last_activity_at = NOW(), updated_at = NOW();
  IF v_step.status <> 'in_progress' THEN
    INSERT INTO public.roadmap_events (user_id, roadmap_id, event_type, reason, metadata)
      VALUES (v_user_id, v_roadmap.id, 'step_started', 'Learner started a roadmap step.',
        jsonb_build_object('step_id', v_step.id, 'skill_id', v_step.skill_id));
  END IF;
  RETURN jsonb_build_object('stepId', v_step.id, 'status', 'in_progress', 'alreadyComplete', FALSE);
END;
$$;

CREATE OR REPLACE FUNCTION public.get_roadmap_assessment(p_roadmap_id UUID, p_step_id UUID)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_user_id UUID := auth.uid();
  v_assessment public.skill_assessments%ROWTYPE;
  v_safe_questions JSONB;
BEGIN
  IF v_user_id IS NULL THEN RAISE EXCEPTION 'AUTH_REQUIRED' USING ERRCODE = '28000'; END IF;
  SELECT a.* INTO v_assessment FROM public.roadmaps r
    JOIN public.roadmap_steps rs ON rs.roadmap_id = r.id
    JOIN public.skill_assessments a ON a.skill_id = rs.skill_id AND a.status = 'published'
    WHERE r.id = p_roadmap_id AND r.user_id = v_user_id AND r.status = 'active'
      AND rs.id = p_step_id AND rs.status NOT IN ('mastered')
    ORDER BY a.version DESC LIMIT 1;
  IF NOT FOUND THEN RAISE EXCEPTION 'ASSESSMENT_NOT_FOUND' USING ERRCODE = 'P0002'; END IF;

  SELECT jsonb_agg(jsonb_build_object(
    'id', q.value->>'id', 'prompt', q.value->>'prompt',
    'options', (SELECT jsonb_agg(jsonb_build_object('id', o.value->>'id', 'text', o.value->>'text') ORDER BY o.ordinality)
      FROM jsonb_array_elements(q.value->'options') WITH ORDINALITY AS o(value, ordinality))
  ) ORDER BY q.ordinality) INTO v_safe_questions
  FROM jsonb_array_elements(v_assessment.questions) WITH ORDINALITY AS q(value, ordinality);

  RETURN jsonb_build_object('assessmentId', v_assessment.id, 'version', v_assessment.version,
    'title', v_assessment.title, 'questions', COALESCE(v_safe_questions, '[]'::jsonb));
END;
$$;

CREATE OR REPLACE FUNCTION public.submit_roadmap_assessment(
  p_roadmap_id UUID, p_step_id UUID, p_answers JSONB, p_client_event_id UUID
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_user_id UUID := auth.uid();
  v_existing public.assessment_attempts%ROWTYPE;
  v_roadmap public.roadmaps%ROWTYPE;
  v_step public.roadmap_steps%ROWTYPE;
  v_assessment public.skill_assessments%ROWTYPE;
  v_question JSONB;
  v_option JSONB;
  v_total INTEGER := 0;
  v_correct INTEGER := 0;
  v_score INTEGER;
  v_attempt_number INTEGER;
  v_best_score INTEGER;
  v_next_status TEXT;
  v_result JSONB;
  v_attempt_id UUID;
  v_today_attempts INTEGER;
BEGIN
  IF v_user_id IS NULL THEN RAISE EXCEPTION 'AUTH_REQUIRED' USING ERRCODE = '28000'; END IF;
  IF p_client_event_id IS NULL OR p_answers IS NULL
    OR jsonb_typeof(p_answers) IS DISTINCT FROM 'object' THEN
    RAISE EXCEPTION 'INVALID_ASSESSMENT_SUBMISSION' USING ERRCODE = '22023';
  END IF;
  SELECT * INTO v_existing FROM public.assessment_attempts
    WHERE user_id = v_user_id AND client_event_id = p_client_event_id;
  IF FOUND THEN
    IF v_existing.roadmap_id <> p_roadmap_id OR v_existing.roadmap_step_id <> p_step_id THEN
      RAISE EXCEPTION 'IDEMPOTENCY_KEY_REUSED' USING ERRCODE = '22023';
    END IF;
    RETURN v_existing.result || jsonb_build_object('attemptId', v_existing.id, 'idempotentReplay', TRUE);
  END IF;

  SELECT * INTO v_roadmap FROM public.roadmaps
    WHERE id = p_roadmap_id AND user_id = v_user_id AND status = 'active';
  IF NOT FOUND THEN RAISE EXCEPTION 'ROADMAP_NOT_FOUND' USING ERRCODE = 'P0002'; END IF;
  SELECT * INTO v_step FROM public.roadmap_steps
    WHERE id = p_step_id AND roadmap_id = v_roadmap.id;
  IF NOT FOUND OR v_step.status NOT IN ('in_progress', 'practice_required', 'completed') THEN
    RAISE EXCEPTION 'START_STEP_BEFORE_ASSESSMENT' USING ERRCODE = '42501';
  END IF;
  SELECT a.* INTO v_assessment FROM public.skill_assessments a
    WHERE a.skill_id = v_step.skill_id AND a.status = 'published'
    ORDER BY a.version DESC LIMIT 1;
  IF NOT FOUND THEN RAISE EXCEPTION 'ASSESSMENT_NOT_FOUND' USING ERRCODE = 'P0002'; END IF;

  SELECT count(*) INTO v_total FROM jsonb_array_elements(v_assessment.questions);
  IF v_total < 1 OR v_total > 20 OR jsonb_object_length(p_answers) <> v_total THEN
    RAISE EXCEPTION 'ANSWER_EVERY_ASSESSMENT_QUESTION' USING ERRCODE = '22023';
  END IF;
  FOR v_question IN SELECT value FROM jsonb_array_elements(v_assessment.questions) LOOP
    IF NOT (p_answers ? (v_question->>'id')) THEN RAISE EXCEPTION 'ANSWER_EVERY_ASSESSMENT_QUESTION' USING ERRCODE = '22023'; END IF;
    IF NOT EXISTS (
      SELECT 1 FROM jsonb_array_elements(v_question->'options') option(value)
      WHERE option.value->>'id' = p_answers->>(v_question->>'id')
    ) THEN RAISE EXCEPTION 'INVALID_ASSESSMENT_OPTION' USING ERRCODE = '22023'; END IF;
    IF p_answers->>(v_question->>'id') = v_question->>'correctOptionId' THEN v_correct := v_correct + 1; END IF;
  END LOOP;
  v_score := round((100.0 * v_correct) / v_total)::INTEGER;
  -- Serialize per user/skill so concurrent submissions cannot pass the cap together.
  PERFORM pg_advisory_xact_lock(hashtext(v_user_id::TEXT), hashtext(v_step.skill_id::TEXT));
  -- Recheck after acquiring the lock so a concurrent retry with the same event
  -- ID receives the committed attempt rather than a unique-constraint error.
  SELECT * INTO v_existing FROM public.assessment_attempts
    WHERE user_id = v_user_id AND client_event_id = p_client_event_id;
  IF FOUND THEN
    IF v_existing.roadmap_id <> p_roadmap_id OR v_existing.roadmap_step_id <> p_step_id THEN
      RAISE EXCEPTION 'IDEMPOTENCY_KEY_REUSED' USING ERRCODE = '22023';
    END IF;
    RETURN v_existing.result || jsonb_build_object('attemptId', v_existing.id, 'idempotentReplay', TRUE);
  END IF;
  v_today_attempts := (SELECT count(*) FROM public.assessment_attempts a
    WHERE a.user_id = v_user_id AND a.skill_id = v_step.skill_id
      AND a.submitted_at >= date_trunc('day', NOW()));
  IF v_today_attempts >= 30 THEN RAISE EXCEPTION 'ASSESSMENT_RATE_LIMIT' USING ERRCODE = '54000'; END IF;
  SELECT count(*) + 1 INTO v_attempt_number FROM public.assessment_attempts a
    WHERE a.user_id = v_user_id AND a.skill_id = v_step.skill_id;

  v_result := jsonb_build_object(
    'roadmapId', v_roadmap.id, 'stepId', v_step.id, 'skillId', v_step.skill_id,
    'score', v_score, 'correctCount', v_correct, 'questionCount', v_total,
    'passed', v_score >= v_assessment.passing_score,
    'mastered', v_score >= v_assessment.mastery_threshold,
    'passingScore', v_assessment.passing_score,
    'masteryThreshold', v_assessment.mastery_threshold,
    'message', CASE WHEN v_score >= v_assessment.mastery_threshold
      THEN 'The saved knowledge-check result meets this skill checkpoint’s mastery threshold.'
      WHEN v_score >= v_assessment.passing_score
      THEN 'Checkpoint passed. Keep the review activity available; the mastery threshold was not reached.'
      ELSE 'Practice is recommended before progressing. Review the lesson and try again.' END
  );

  INSERT INTO public.assessment_attempts (
    user_id, skill_id, roadmap_id, roadmap_step_id, assessment_version,
    score, result, attempt_number, client_event_id
  ) VALUES (
    v_user_id, v_step.skill_id, v_roadmap.id, v_step.id, v_assessment.version,
    v_score, v_result, v_attempt_number, p_client_event_id
  ) RETURNING id INTO v_attempt_id;

  INSERT INTO public.learner_skill_progress (
    user_id, skill_id, status, mastery_score, assessment_count,
    last_activity_at, completed_at, evidence_summary, updated_at
  ) VALUES (
    v_user_id, v_step.skill_id,
    CASE WHEN v_score >= v_assessment.mastery_threshold THEN 'mastered'
      WHEN v_score >= v_assessment.passing_score THEN 'completed' ELSE 'practice_required' END,
    v_score, 1, NOW(), CASE WHEN v_score >= v_assessment.passing_score THEN NOW() ELSE NULL END,
    format('Version %s skill knowledge check: %s%% (%s/%s correct).', v_assessment.version, v_score, v_correct, v_total), NOW()
  ) ON CONFLICT (user_id, skill_id) DO UPDATE SET
    mastery_score = GREATEST(COALESCE(public.learner_skill_progress.mastery_score, 0), EXCLUDED.mastery_score),
    status = CASE
      WHEN public.learner_skill_progress.status = 'mastered'
        OR GREATEST(COALESCE(public.learner_skill_progress.mastery_score, 0), EXCLUDED.mastery_score) >= v_assessment.mastery_threshold THEN 'mastered'
      WHEN GREATEST(COALESCE(public.learner_skill_progress.mastery_score, 0), EXCLUDED.mastery_score) >= v_assessment.passing_score THEN 'completed'
      ELSE 'practice_required' END,
    assessment_count = public.learner_skill_progress.assessment_count + 1,
    last_activity_at = NOW(),
    completed_at = CASE WHEN GREATEST(COALESCE(public.learner_skill_progress.mastery_score, 0), EXCLUDED.mastery_score) >= v_assessment.passing_score
      THEN COALESCE(public.learner_skill_progress.completed_at, NOW()) ELSE public.learner_skill_progress.completed_at END,
    evidence_summary = EXCLUDED.evidence_summary, updated_at = NOW();

  SELECT lp.mastery_score, lp.status INTO v_best_score, v_next_status
    FROM public.learner_skill_progress lp WHERE lp.user_id = v_user_id AND lp.skill_id = v_step.skill_id;
  UPDATE public.roadmap_steps SET
    status = CASE WHEN v_next_status = 'mastered' THEN 'mastered'
      WHEN v_next_status = 'completed' THEN 'completed' ELSE 'practice_required' END,
    updated_at = NOW()
    WHERE id = v_step.id;
  INSERT INTO public.roadmap_events (user_id, roadmap_id, event_type, reason, metadata)
    VALUES (v_user_id, v_roadmap.id, 'assessment_submitted',
      CASE WHEN v_next_status = 'mastered' THEN 'Knowledge-check evidence met the skill mastery threshold.'
        WHEN v_next_status = 'completed' THEN 'Knowledge check passed; the learner may continue while retaining review guidance.'
        ELSE 'Knowledge check indicated that more practice is needed.' END,
      jsonb_build_object('assessment_attempt_id', v_attempt_id, 'step_id', v_step.id, 'best_score', v_best_score));

  RETURN v_result || jsonb_build_object('attemptId', v_attempt_id, 'idempotentReplay', FALSE,
    'adaptationAvailable', v_next_status = 'mastered');
END;
$$;

CREATE OR REPLACE FUNCTION public.record_roadmap_review_event(
  p_roadmap_id UUID, p_assessment_attempt_id UUID
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_user_id UUID := auth.uid();
  v_attempt public.assessment_attempts%ROWTYPE;
  v_roadmap public.roadmaps%ROWTYPE;
BEGIN
  IF v_user_id IS NULL THEN RAISE EXCEPTION 'AUTH_REQUIRED' USING ERRCODE = '28000'; END IF;
  SELECT * INTO v_roadmap FROM public.roadmaps
    WHERE id = p_roadmap_id AND user_id = v_user_id AND status = 'active';
  IF NOT FOUND THEN RAISE EXCEPTION 'ROADMAP_NOT_FOUND' USING ERRCODE = 'P0002'; END IF;
  SELECT * INTO v_attempt FROM public.assessment_attempts
    WHERE id = p_assessment_attempt_id AND user_id = v_user_id AND roadmap_id = v_roadmap.id;
  IF NOT FOUND THEN RAISE EXCEPTION 'ASSESSMENT_EVIDENCE_NOT_FOUND' USING ERRCODE = 'P0002'; END IF;
  IF (v_attempt.result->>'mastered')::BOOLEAN IS TRUE THEN
    RAISE EXCEPTION 'MASTERY_EVIDENCE_REQUIRES_ADAPTATION' USING ERRCODE = '22023';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM public.roadmap_events e WHERE e.user_id = v_user_id
    AND e.event_type = 'adaptation_reviewed' AND e.metadata->>'assessment_attempt_id' = p_assessment_attempt_id::TEXT) THEN
    INSERT INTO public.roadmap_events (user_id, roadmap_id, event_type, previous_version, new_version, reason, metadata)
      VALUES (v_user_id, v_roadmap.id, 'adaptation_reviewed', v_roadmap.version, v_roadmap.version,
        'This result did not meet the mastery threshold. The current pathway stays in order and a review activity is recommended.',
        jsonb_build_object('assessment_attempt_id', p_assessment_attempt_id::TEXT,
          'score', v_attempt.score, 'review_required', (v_attempt.result->>'passed')::BOOLEAN IS NOT TRUE))
      ON CONFLICT DO NOTHING;
  END IF;
  RETURN jsonb_build_object('changed', FALSE, 'version', v_roadmap.version,
    'reason', 'The assessment result did not meet the mastery threshold. The current roadmap is preserved; review the lesson and retry.');
END;
$$;

REVOKE ALL ON FUNCTION public.create_learning_roadmap(TEXT, INTEGER, TEXT, TEXT, TEXT, TEXT, TEXT, INTEGER, INTEGER, INTEGER, JSONB, UUID, UUID, UUID) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.start_roadmap_step(UUID, UUID) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.get_roadmap_assessment(UUID, UUID) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.submit_roadmap_assessment(UUID, UUID, JSONB, UUID) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.record_roadmap_review_event(UUID, UUID) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.create_learning_roadmap(TEXT, INTEGER, TEXT, TEXT, TEXT, TEXT, TEXT, INTEGER, INTEGER, INTEGER, JSONB, UUID, UUID, UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.start_roadmap_step(UUID, UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_roadmap_assessment(UUID, UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.submit_roadmap_assessment(UUID, UUID, JSONB, UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.record_roadmap_review_event(UUID, UUID) TO authenticated;

-- The following pathway content was authored for this milestone. Official
-- Python documentation links were opened and checked on 2026-10-12.
INSERT INTO public.learning_pathways (slug, name, description, default_language, content_version, status)
VALUES (
  'learn_python', 'Python from first program to a small project',
  'An English-language beginner pathway that starts with running a program and builds toward a small command-line text summarizer. The estimates are planning guidance, not a promise.',
  'en', '1.0.0', 'published'
)
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description,
  default_language = EXCLUDED.default_language, content_version = EXCLUDED.content_version,
  status = EXCLUDED.status, updated_at = NOW();

INSERT INTO public.skills (
  slug, name, description, category, difficulty_level, estimated_effort_minutes,
  mastery_threshold, learning_objectives, completion_criteria, status, content_version
) VALUES
  ('python-first-program', 'Run Python and write a first program',
   'Set up a Python interpreter, distinguish an interactive prompt from a source file, and run a small program that prints a result.',
   'Python foundations', 'beginner', 75, 90,
   ARRAY['Recognize the Python prompt and a saved .py file.', 'Run a short program and describe its output.'],
   ARRAY['Work through the short first-program lesson.', 'Pass the 3-question check with at least 67%.'], 'published', '1.0.0'),
  ('python-values-and-variables', 'Use values, variables, and expressions',
   'Give names to values, work with numbers and text, and combine expressions to produce a result.',
   'Python foundations', 'beginner', 105, 90,
   ARRAY['Assign values with = and explain what a variable name refers to.', 'Distinguish basic numbers from quoted text.', 'Evaluate simple arithmetic and string expressions.'],
   ARRAY['Complete the variable and expression exercise.', 'Pass the 3-question check with at least 67%.'], 'published', '1.0.0'),
  ('python-conditions-and-loops', 'Make decisions and repeat work',
   'Use Boolean conditions, if/else branches, and for loops to process a short sequence.',
   'Python foundations', 'beginner', 135, 90,
   ARRAY['Choose an if/else branch from a condition.', 'Repeat an action over a sequence.', 'Use indentation to define a block.'],
   ARRAY['Complete the branching and loop exercise.', 'Pass the 3-question check with at least 67%.'], 'published', '1.0.0'),
  ('python-functions-and-collections', 'Organize code with functions and collections',
   'Define and call a function, return a result, and use lists and dictionaries to group related values.',
   'Python foundations', 'beginner', 180, 90,
   ARRAY['Define a function with parameters and a return value.', 'Choose a list or dictionary for a small data task.', 'Break a repeated task into a named function.'],
   ARRAY['Complete the function and collection exercise.', 'Pass the 3-question check with at least 67%.'], 'published', '1.0.0'),
  ('python-files-errors-and-modules', 'Work with files, errors, and modules',
   'Read and write a text file with a context manager, handle an expected error, and import a standard-library module.',
   'Python foundations', 'beginner', 210, 90,
   ARRAY['Read and write text using with open(...).', 'Handle an expected exception without hiding unrelated errors.', 'Import and use a standard-library module.'],
   ARRAY['Complete the safe file-reading exercise.', 'Pass the 3-question check with at least 67%.'], 'published', '1.0.0'),
  ('python-cli-text-project', 'Build a small command-line text summarizer',
   'Apply the earlier skills in a small command-line exercise that reads text, counts lines and words, and prints a concise summary.',
   'Python foundations', 'beginner', 240, 90,
   ARRAY['Separate the work into small functions.', 'Read a text file and handle a missing file clearly.', 'Print a summary with line and word counts.'],
   ARRAY['Complete the small project activity in a local Python environment.', 'Pass the 3-question project check with at least 67%.'], 'published', '1.0.0'),
  ('python-testing-background', 'Check a small function with repeatable examples',
   'Use a few repeatable input/output examples to check a function before relying on it in a project.',
   'Python foundations', 'beginner', 90, 90,
   ARRAY['Write repeatable checks for expected function results.', 'Use a failing example to guide a correction.'],
   ARRAY['Complete the optional repeatable-check exercise.'], 'published', '1.0.0')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name, description = EXCLUDED.description, category = EXCLUDED.category,
  difficulty_level = EXCLUDED.difficulty_level, estimated_effort_minutes = EXCLUDED.estimated_effort_minutes,
  mastery_threshold = EXCLUDED.mastery_threshold, learning_objectives = EXCLUDED.learning_objectives,
  completion_criteria = EXCLUDED.completion_criteria, status = EXCLUDED.status,
  content_version = EXCLUDED.content_version, updated_at = NOW();

INSERT INTO public.learning_pathway_skills (pathway_id, skill_id, sequence_hint, is_target_skill)
SELECT p.id, s.id, seed.sequence_hint, seed.is_target_skill
FROM (VALUES
  ('python-first-program', 1, FALSE),
  ('python-values-and-variables', 2, FALSE),
  ('python-conditions-and-loops', 3, FALSE),
  ('python-functions-and-collections', 4, FALSE),
  ('python-files-errors-and-modules', 5, FALSE),
  ('python-cli-text-project', 6, TRUE),
  ('python-testing-background', 7, FALSE)
) AS seed(skill_slug, sequence_hint, is_target_skill)
JOIN public.skills s ON s.slug = seed.skill_slug
JOIN public.learning_pathways p ON p.slug = 'learn_python'
ON CONFLICT (pathway_id, skill_id) DO UPDATE SET
  sequence_hint = EXCLUDED.sequence_hint, is_target_skill = EXCLUDED.is_target_skill;

INSERT INTO public.skill_dependencies (skill_id, prerequisite_skill_id, dependency_type, minimum_mastery_threshold)
SELECT dependent.id, prerequisite.id, seed.dependency_type, seed.minimum_threshold
FROM (VALUES
  ('python-values-and-variables', 'python-first-program', 'required', 67),
  ('python-conditions-and-loops', 'python-values-and-variables', 'required', 67),
  ('python-functions-and-collections', 'python-conditions-and-loops', 'required', 67),
  ('python-files-errors-and-modules', 'python-functions-and-collections', 'required', 67),
  ('python-cli-text-project', 'python-files-errors-and-modules', 'required', 67),
  ('python-cli-text-project', 'python-testing-background', 'recommended', NULL)
) AS seed(dependent_slug, prerequisite_slug, dependency_type, minimum_threshold)
JOIN public.skills dependent ON dependent.slug = seed.dependent_slug
JOIN public.skills prerequisite ON prerequisite.slug = seed.prerequisite_slug
ON CONFLICT (skill_id, prerequisite_skill_id) DO UPDATE SET
  dependency_type = EXCLUDED.dependency_type,
  minimum_mastery_threshold = EXCLUDED.minimum_mastery_threshold;

INSERT INTO public.learning_resources (
  skill_id, slug, title, resource_type, description, content_markdown, url, provider,
  language, access_type, verification_status, last_verified_at, estimated_minutes,
  completion_criteria, sort_order
)
SELECT s.id, seed.resource_slug, seed.title, seed.resource_type, seed.description,
  seed.content_markdown, seed.url, seed.provider, 'en', seed.access_type,
  seed.verification_status, seed.last_verified_at, seed.estimated_minutes,
  seed.completion_criteria, seed.sort_order
FROM (VALUES
  ('python-first-program', 'first-program-lesson', 'A gentle first Python program', 'lesson',
   'Start with a tiny program and learn how to run it.',
   $lesson1$Python is a language in which you write instructions in a text file and ask the Python interpreter to run them.

Try this in a file named `hello.py`:

```python
print("Hello, Python")
```

Run the file with the Python command available on your computer (for example, `python hello.py`, `python3 hello.py`, or the Windows launcher `py hello.py`). The exact command depends on how Python was installed. The interactive `>>>` prompt is for trying expressions; it is not part of a saved `.py` file.

This explanation is written for learners new to programming. The linked official tutorial is a reference, and its own introduction says it assumes prior programming knowledge.$lesson1$,
   'https://docs.python.org/3/tutorial/interpreter.html', 'Python Software Foundation documentation', 'free', 'link_checked', '2026-10-12 00:00:00+00', 25,
   ARRAY['Run a saved Python file and explain the output.'], 1),
  ('python-first-program', 'first-program-practice', 'Change the message and run it again', 'exercise',
   'Edit one string in the starter program and run the file twice with different messages.',
   $exercise1$Create a short Python file that prints a greeting. Change the message, run it again, and note what changed. Keep the `>>>` prompt out of the file.$exercise1$,
   NULL, 'TALVIORA TECH learning activity', 'free', 'not_applicable', NULL, 20,
   ARRAY['Submit the skill knowledge check after trying the program.'], 2),
  ('python-values-and-variables', 'values-lesson', 'Names, numbers, and text', 'lesson',
   'Learn how assignment gives a name to a value and how quotes distinguish text.',
   $lesson2$In `score = 3`, the equals sign assigns the value `3` to the name `score`. It is an instruction, not a claim that two sides are mathematically equal. A value such as `3` is numeric; a value such as `"three"` is text. `print(score + 2)` evaluates the expression before displaying it.$lesson2$,
   'https://docs.python.org/3/tutorial/introduction.html', 'Python Software Foundation documentation', 'free', 'link_checked', '2026-10-12 00:00:00+00', 30,
   ARRAY['Assign a number and a string to separate names and predict a simple expression.'], 1),
  ('python-values-and-variables', 'values-practice', 'Build a tiny receipt total', 'exercise',
   'Use named prices and arithmetic to calculate a total.',
   $exercise2$Create two numeric variables for item prices, add them, and print the total. Then make one value text in quotes and describe why it is different.$exercise2$,
   NULL, 'TALVIORA TECH learning activity', 'free', 'not_applicable', NULL, 30,
   ARRAY['Try the calculation before submitting the knowledge check.'], 2),
  ('python-conditions-and-loops', 'control-flow-lesson', 'Choose a branch and repeat a task', 'lesson',
   'Use conditions to choose a path and loops to process multiple items.',
   $lesson3$An `if` statement runs a block when its condition is true. A `for` loop processes each item in an iterable. Indentation marks which statements belong to a block; use consistent indentation.$lesson3$,
   'https://docs.python.org/3/tutorial/controlflow.html', 'Python Software Foundation documentation', 'free', 'link_checked', '2026-10-12 00:00:00+00', 35,
   ARRAY['Predict which branch runs and what a loop prints.'], 1),
  ('python-conditions-and-loops', 'control-flow-practice', 'Label a short list of temperatures', 'exercise',
   'Use a loop and an if/else branch to label each value.',
   $exercise3$Given a short list of numbers, loop through each one and print whether it is below, at, or above a chosen threshold. Change one number and run the program again.$exercise3$,
   NULL, 'TALVIORA TECH learning activity', 'free', 'not_applicable', NULL, 35,
   ARRAY['Run the loop on at least three values before the knowledge check.'], 2),
  ('python-functions-and-collections', 'functions-collections-lesson', 'Reusable functions and grouped values', 'lesson',
   'Use a function to name a task; use lists and dictionaries to group data.',
   $lesson4$A function begins with `def`, may accept parameters, and can `return` a result. A list stores an ordered sequence. A dictionary maps keys to values. Choose a structure based on how the task will use the data.$lesson4$,
   'https://docs.python.org/3/tutorial/controlflow.html#defining-functions', 'Python Software Foundation documentation', 'free', 'link_checked', '2026-10-12 00:00:00+00', 40,
   ARRAY['Write a function that accepts a list and returns a result.'], 1),
  ('python-functions-and-collections', 'collections-reference', 'Official reference: lists and dictionaries', 'documentation',
   'Look up lists and dictionaries in the official Python tutorial after trying the beginner explanation.',
   NULL, 'https://docs.python.org/3/tutorial/datastructures.html', 'Python Software Foundation documentation', 'free', 'link_checked', '2026-10-12 00:00:00+00', 20,
   ARRAY['Identify one task suited to a list and one suited to a dictionary.'], 2),
  ('python-functions-and-collections', 'functions-collections-practice', 'Summarize a short list', 'exercise',
   'Write a function that receives several values and returns their count and sum.',
   $exercise4$Create a list of a few numbers. Write a function that returns their sum and count. Call the function and print both returned values.$exercise4$,
   NULL, 'TALVIORA TECH learning activity', 'free', 'not_applicable', NULL, 45,
   ARRAY['Call your function with a second list to check that it is reusable.'], 2),
  ('python-files-errors-and-modules', 'files-errors-lesson', 'Read files carefully and handle expected errors', 'lesson',
   'Use context managers for files and narrow exception handling for expected failures.',
   $lesson5$Use `with open(path, encoding="utf-8") as file:` so the file is closed when the block ends. Catch only errors you expect, such as `FileNotFoundError`; broad exception handling can hide unrelated defects. Import standard-library modules by name.$lesson5$,
   'https://docs.python.org/3/tutorial/inputoutput.html', 'Python Software Foundation documentation', 'free', 'link_checked', '2026-10-12 00:00:00+00', 45,
   ARRAY['Read a local text file and explain what happens if it is missing.'], 1),
  ('python-files-errors-and-modules', 'files-errors-practice', 'Count lines in a local text file', 'exercise',
   'Read a text file one line at a time and handle a missing-file error with a useful message.',
   $exercise5$Create a small text file and write a program that counts its lines. Try a path that does not exist and handle only `FileNotFoundError` with a clear message.$exercise5$,
   'https://docs.python.org/3/tutorial/errors.html', 'Python Software Foundation documentation', 'free', 'link_checked', '2026-10-12 00:00:00+00', 45,
   ARRAY['Run the exercise with an existing file and a missing-file case.'], 2),
  ('python-cli-text-project', 'cli-project-brief', 'Project: command-line text summary', 'project',
   'Combine functions, collections, and safe file reading in a small local project.',
   $project6$Build a small command-line program that reads a text file, counts lines and words, and prints a concise summary. Keep file reading in one function, counting in another, and handle a missing file without a traceback. The app does not inspect or certify your project; this is a self-guided activity.$project6$,
   NULL, 'TALVIORA TECH learning activity', 'free', 'not_applicable', NULL, 75,
   ARRAY['Build and run the program locally.', 'Describe the output and one error case in your project notes.'], 1),
  ('python-cli-text-project', 'cli-project-checklist', 'Plan and review the project', 'exercise',
   'Use a short checklist to break the project into small functions and test ordinary and missing-file cases.',
   $exercise6$Before coding, write down the input file, expected output, and missing-file behavior. Implement one function at a time. Try an empty file and a small file. This activity is self-reported and the app does not execute your code.$exercise6$,
   NULL, 'TALVIORA TECH learning activity', 'free', 'not_applicable', NULL, 35,
   ARRAY['Attempt the project knowledge check after completing the local exercise.'], 2),
  ('python-testing-background', 'testing-optional', 'Optional: make checks repeatable', 'documentation',
   'Explore the standard-library testing tool when you want repeatable checks.',
   $optional7$An optional next step is to write repeatable checks for a function. TALVIORA TECH does not run submitted Python code in this milestone.$optional7$,
   'https://docs.python.org/3/library/unittest.html', 'Python Software Foundation documentation', 'free', 'link_checked', '2026-10-12 00:00:00+00', 30,
   ARRAY['Optional background only; this is not a blocking prerequisite.'], 1)
) AS seed(skill_slug, resource_slug, title, resource_type, description, content_markdown,
          url, provider, access_type, verification_status, last_verified_at,
          estimated_minutes, completion_criteria, sort_order)
JOIN public.skills s ON s.slug = seed.skill_slug
ON CONFLICT (skill_id, slug) DO UPDATE SET
  title = EXCLUDED.title, resource_type = EXCLUDED.resource_type,
  description = EXCLUDED.description, content_markdown = EXCLUDED.content_markdown,
  url = EXCLUDED.url, provider = EXCLUDED.provider, language = EXCLUDED.language,
  access_type = EXCLUDED.access_type, verification_status = EXCLUDED.verification_status,
  last_verified_at = EXCLUDED.last_verified_at, estimated_minutes = EXCLUDED.estimated_minutes,
  completion_criteria = EXCLUDED.completion_criteria, sort_order = EXCLUDED.sort_order,
  updated_at = NOW();

INSERT INTO public.skill_assessments (skill_id, version, title, questions, passing_score, mastery_threshold, status)
SELECT s.id, seed.version, seed.title, seed.questions::JSONB, seed.passing_score, seed.mastery_threshold, 'published'
FROM (VALUES
 ('python-first-program', 1, 'Run Python and write a first program', 67, 90,
  $quiz1$[
    {"id":"q1","prompt":"Which line displays the text Hello?","options":[{"id":"a","text":"print(Hello)"},{"id":"b","text":"print(\"Hello\")"},{"id":"c","text":"show(\"Hello\")"}],"correctOptionId":"b"},
    {"id":"q2","prompt":"What is the >>> marker in an interactive Python session?","options":[{"id":"a","text":"The prompt shown by the interpreter"},{"id":"b","text":"A required prefix for every line in a .py file"},{"id":"c","text":"A Python comment"}],"correctOptionId":"a"},
    {"id":"q3","prompt":"What does a Python interpreter do with a saved Python file?","options":[{"id":"a","text":"Runs the instructions in the file"},{"id":"b","text":"Converts it into a spreadsheet"},{"id":"c","text":"Only displays the file name"}],"correctOptionId":"a"}
  ]$quiz1$),
 ('python-values-and-variables', 1, 'Use values, variables, and expressions', 67, 90,
  $quiz2$[
    {"id":"q1","prompt":"In score = 3, what does = do?","options":[{"id":"a","text":"Assigns the value 3 to score"},{"id":"b","text":"Checks mathematical equality"},{"id":"c","text":"Prints score"}],"correctOptionId":"a"},
    {"id":"q2","prompt":"Which value is text?","options":[{"id":"a","text":"12"},{"id":"b","text":"12.5"},{"id":"c","text":"\"12\""}],"correctOptionId":"c"},
    {"id":"q3","prompt":"If count = 4, what is count + 2?","options":[{"id":"a","text":"6"},{"id":"b","text":"42"},{"id":"c","text":"count2"}],"correctOptionId":"a"}
  ]$quiz2$),
 ('python-conditions-and-loops', 1, 'Make decisions and repeat work', 67, 90,
  $quiz3$[
    {"id":"q1","prompt":"Which block runs when a condition is false?","options":[{"id":"a","text":"The matching if block"},{"id":"b","text":"The else block, when provided"},{"id":"c","text":"Every block in the file"}],"correctOptionId":"b"},
    {"id":"q2","prompt":"What does a for loop commonly do?","options":[{"id":"a","text":"Processes items from an iterable"},{"id":"b","text":"Defines a new file"},{"id":"c","text":"Imports a module"}],"correctOptionId":"a"},
    {"id":"q3","prompt":"What marks the statements inside a Python if block?","options":[{"id":"a","text":"Consistent indentation"},{"id":"b","text":"Curly braces around every line"},{"id":"c","text":"A semicolon at the start"}],"correctOptionId":"a"}
  ]$quiz3$),
 ('python-functions-and-collections', 1, 'Use functions and collections', 67, 90,
  $quiz4$[
    {"id":"q1","prompt":"Which keyword begins a function definition?","options":[{"id":"a","text":"func"},{"id":"b","text":"def"},{"id":"c","text":"make"}],"correctOptionId":"b"},
    {"id":"q2","prompt":"What does return value do inside a function?","options":[{"id":"a","text":"Sends a result back to the caller"},{"id":"b","text":"Always prints the result"},{"id":"c","text":"Repeats the function forever"}],"correctOptionId":"a"},
    {"id":"q3","prompt":"Which structure maps keys to values?","options":[{"id":"a","text":"A dictionary"},{"id":"b","text":"A comment"},{"id":"c","text":"A for loop"}],"correctOptionId":"a"}
  ]$quiz4$),
 ('python-files-errors-and-modules', 1, 'Work with files, errors, and modules', 67, 90,
  $quiz5$[
    {"id":"q1","prompt":"What does a with block help ensure when used with open(...)?","options":[{"id":"a","text":"The file is closed when the block exits"},{"id":"b","text":"The file is uploaded to the web"},{"id":"c","text":"Every error is ignored"}],"correctOptionId":"a"},
    {"id":"q2","prompt":"Which response is appropriate when a file may not exist?","options":[{"id":"a","text":"Catch the expected FileNotFoundError and explain the issue"},{"id":"b","text":"Catch every possible error and silently continue"},{"id":"c","text":"Delete the folder"}],"correctOptionId":"a"},
    {"id":"q3","prompt":"How do you make a standard-library module's names available?","options":[{"id":"a","text":"Use an import statement"},{"id":"b","text":"Rename the Python interpreter"},{"id":"c","text":"Put its name in a comment"}],"correctOptionId":"a"}
  ]$quiz5$),
 ('python-cli-text-project', 1, 'Check the command-line project concepts', 67, 90,
  $quiz6$[
    {"id":"q1","prompt":"Which design makes a small text-summary program easier to check?","options":[{"id":"a","text":"Separate file reading, counting, and printing into named functions"},{"id":"b","text":"Put every operation in one unexplained expression"},{"id":"c","text":"Ignore the input file"}],"correctOptionId":"a"},
    {"id":"q2","prompt":"What should the program do if its input file is missing?","options":[{"id":"a","text":"Give a clear message for the expected missing-file case"},{"id":"b","text":"Report a successful summary anyway"},{"id":"c","text":"Catch every exception silently"}],"correctOptionId":"a"},
    {"id":"q3","prompt":"Does passing this concept check prove that the app inspected your local project?","options":[{"id":"a","text":"Yes, it ran the code automatically"},{"id":"b","text":"No, the local project activity is self-guided in this milestone"},{"id":"c","text":"Yes, it verified a GitHub repository"}],"correctOptionId":"b"}
  ]$quiz6$)
) AS seed(skill_slug, version, title, passing_score, mastery_threshold, questions)
JOIN public.skills s ON s.slug = seed.skill_slug
ON CONFLICT (skill_id, version) DO UPDATE SET
  title = EXCLUDED.title, questions = EXCLUDED.questions,
  passing_score = EXCLUDED.passing_score, mastery_threshold = EXCLUDED.mastery_threshold,
  status = EXCLUDED.status;

COMMIT;
