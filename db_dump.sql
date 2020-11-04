--
-- PostgreSQL database dump
--

-- Dumped from database version 12.1
-- Dumped by pg_dump version 12.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: applicants; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.applicants (
    email text NOT NULL,
    full_name text NOT NULL,
    password text NOT NULL
);


--
-- Name: applications; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.applications (
    application_id text NOT NULL,
    applicant_email text,
    exam_id text,
    status text NOT NULL,
    questions_total integer,
    questions_correct integer,
    questions_wrong integer,
    questions_unanswered integer,
    eval_pct numeric(5,2)
);


--
-- Name: choices; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.choices (
    choice_id text NOT NULL,
    choice_text text NOT NULL,
    question_id text
);


--
-- Name: examiners; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.examiners (
    username text NOT NULL,
    email text,
    first_name text NOT NULL,
    last_name text,
    password text NOT NULL,
    org_handle text NOT NULL,
    photo_url text
);


--
-- Name: exams; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.exams (
    exam_id text NOT NULL,
    exam_name text NOT NULL,
    exam_description text,
    exam_owner text NOT NULL,
    exam_fee money DEFAULT 0.00,
    exam_pass_score integer DEFAULT 70,
    exam_status text DEFAULT 'enabled'::text
);


--
-- Name: organizations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.organizations (
    handle text NOT NULL,
    key text NOT NULL,
    name text NOT NULL,
    logo_url text
);


--
-- Name: questions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.questions (
    question_id text NOT NULL,
    question_type text NOT NULL,
    question_text text NOT NULL,
    question_seq integer NOT NULL,
    valid_answer_id text NOT NULL,
    exam_id text
);


--
-- Data for Name: applicants; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.applicants (email, full_name, password) FROM stdin;
\.


--
-- Data for Name: applications; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.applications (application_id, applicant_email, exam_id, status, questions_total, questions_correct, questions_wrong, questions_unanswered, eval_pct) FROM stdin;
\.


--
-- Data for Name: choices; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.choices (choice_id, choice_text, question_id) FROM stdin;
\.


--
-- Data for Name: examiners; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.examiners (username, email, first_name, last_name, password, org_handle, photo_url) FROM stdin;
\.


--
-- Data for Name: exams; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.exams (exam_id, exam_name, exam_description, exam_owner, exam_fee, exam_pass_score, exam_status) FROM stdin;
\.


--
-- Data for Name: organizations; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.organizations (handle, key, name, logo_url) FROM stdin;
ORG1	org1	SOME STATE UNIVERSITY	sangga-rima-roman-selia-lSwbzenbmIw-unsplash.jpg
\.


--
-- Data for Name: questions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.questions (question_id, question_type, question_text, question_seq, valid_answer_id, exam_id) FROM stdin;
\.


--
-- Name: applicants applicants_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.applicants
    ADD CONSTRAINT applicants_pkey PRIMARY KEY (email);


--
-- Name: applications applications_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.applications
    ADD CONSTRAINT applications_pkey PRIMARY KEY (application_id);


--
-- Name: choices choices_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.choices
    ADD CONSTRAINT choices_pkey PRIMARY KEY (choice_id);


--
-- Name: examiners examiners_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.examiners
    ADD CONSTRAINT examiners_pkey PRIMARY KEY (username);


--
-- Name: exams exams_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.exams
    ADD CONSTRAINT exams_pkey PRIMARY KEY (exam_id);


--
-- Name: organizations organizations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.organizations
    ADD CONSTRAINT organizations_pkey PRIMARY KEY (handle);


--
-- Name: questions questions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_pkey PRIMARY KEY (question_id);


--
-- Name: applications applications_applicant_email_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.applications
    ADD CONSTRAINT applications_applicant_email_fkey FOREIGN KEY (applicant_email) REFERENCES public.applicants(email) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: applications applications_exam_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.applications
    ADD CONSTRAINT applications_exam_id_fkey FOREIGN KEY (exam_id) REFERENCES public.exams(exam_id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: choices choices_question_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.choices
    ADD CONSTRAINT choices_question_id_fkey FOREIGN KEY (question_id) REFERENCES public.questions(question_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: examiners examiners_org_handle_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.examiners
    ADD CONSTRAINT examiners_org_handle_fkey FOREIGN KEY (org_handle) REFERENCES public.organizations(handle) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: exams exams_exam_owner_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.exams
    ADD CONSTRAINT exams_exam_owner_fkey FOREIGN KEY (exam_owner) REFERENCES public.examiners(username) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: questions questions_exam_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_exam_id_fkey FOREIGN KEY (exam_id) REFERENCES public.exams(exam_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

