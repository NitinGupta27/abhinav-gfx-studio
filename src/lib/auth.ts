const KEY = "abhinavgfx.admin.session";
const USER = "abhinav";
const PASS = "abhinav22991111";

export function login(username: string, password: string): boolean {
  if (username === USER && password === PASS) {
    sessionStorage.setItem(KEY, "1");
    return true;
  }
  return false;
}
export function logout() {
  sessionStorage.removeItem(KEY);
}
export function isAuthed(): boolean {
  return sessionStorage.getItem(KEY) === "1";
}
