
function Home() {
    const username = localStorage.getItem("username");
  return (
    <div>
        <h1>Home</h1>
        <p>Welcome  {username}</p>
    </div>
  )
}

export default Home