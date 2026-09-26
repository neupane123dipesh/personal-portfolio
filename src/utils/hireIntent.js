export const HIRE_SUBJECT_KEY = 'portfolio_hire_subject';
export const DEFAULT_HIRE_SUBJECT = 'Hiring inquiry — Dipesh Neupane portfolio';

export function markHireIntent() {
  sessionStorage.setItem(HIRE_SUBJECT_KEY, DEFAULT_HIRE_SUBJECT);
}

export function consumeHireSubject() {
  const value = sessionStorage.getItem(HIRE_SUBJECT_KEY);
  if (value) sessionStorage.removeItem(HIRE_SUBJECT_KEY);
  return value;
}
