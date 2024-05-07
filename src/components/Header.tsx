import { UserProfile } from "@clerk/nextjs";
export default function Header() {
  return <UserProfile path="/user-profile" routing="path" />;
}
