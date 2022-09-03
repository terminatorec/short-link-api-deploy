import React from 'react'

const Home__page:React.FC = () => {
  return (
    <div className="p-4">
        <p>Welcome, this is a site for shortening links</p>
        <p>Here you can get statistics on your links</p>
        <p className="mb-4">The site interacts with FastAPI</p>
        <a href="http://79.143.31.216/docs#/" target={'_blank'} className="text-blue-400 underline text-lg">API</a>
    </div>
  )
}

export default Home__page