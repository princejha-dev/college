import React, {useEffect, useState} from 'react'
import api from '../api'


export default function NoticeBoard(){
const [notices, setNotices] = useState([])
const [text, setText] = useState('')


useEffect(()=>{
api.get('/notices')
.then(r=> setNotices(r.data))
.catch(()=> console.log('Offline - notices'))
},[])


const postNotice = async ()=>{
if(!text.trim()) return alert('Please type a notice')
try{
const res = await api.post('/notices', { text, author: 'Local Teacher' })
setNotices(prev=> [res.data.notice, ...prev])
setText('')
}catch(e){
alert('Could not post (offline)')
}
}


return (
	<section className="bg-white p-8 rounded-2xl shadow-lg">
		<div className="flex items-center justify-between mb-6">
			<h2 className="text-2xl font-bold text-blue-700">Community Notice Board</h2>
			<span className="text-sm text-gray-500">Share announcements</span>
		</div>

		<div className="mb-6">
			<textarea value={text} onChange={e => setText(e.target.value)} placeholder="Write a short announcement..." className="w-full p-4 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400" />
			<div className="flex justify-end mt-2">
				<button onClick={postNotice} className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition">Post</button>
			</div>
		</div>

		<div className="space-y-4">
			{notices.map(n => (
				<div key={n.id || n._id} className="p-4 rounded-xl bg-blue-50 border border-blue-100 shadow">
					<div className="flex justify-between items-center mb-1">
						<span className="font-semibold text-blue-800">{n.author || 'Unknown'}</span>
						<span className="text-xs text-gray-400">{n.date ? new Date(n.date).toLocaleString() : ''}</span>
					</div>
					<p className="text-gray-700 text-sm">{n.text}</p>
				</div>
			))}
		</div>
	</section>
)
}