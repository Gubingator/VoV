// pages/admin.jsx
export default function AdminDashboard () {
    const [session] = useSession() 
    // session is always non-null inside this page, all the way down the React tree.
    return "Some super secret dashboard"
  }
  
  AdminDashboard.auth = true
  