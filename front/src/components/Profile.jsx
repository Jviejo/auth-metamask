import { useAuth } from "./Authentication";
function Profile() {
  const { user } = useAuth(); 
  return (
    <div>
      <h1>Profile</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  )
}

export default Profile