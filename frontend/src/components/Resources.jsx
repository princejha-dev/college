import React, {useEffect, useState} from 'react'
import api from '../api'


export default function Resources(){
const [resources, setResources] = useState([])


useEffect(()=>{
api.get('/resources')
.then(r=> setResources(r.data))
.catch(()=> console.log('Offline - resources'))
},[])


const download = (url, title)=>{
// opens resource in new tab — in production consider streaming or proxy
window.open(url, '_blank')
}


return (
<section className="bg-white p-4 rounded-xl shadow">
<div className="flex items-center justify-between mb-4">
			<h2 className="text-2xl font-bold text-blue-700">Learning Resources</h2>
<span className="text-sm text-gray-500">Downloadable guides</span>
</div>
<div className="flex flex-wrap gap-3">
			{resources.map(r => (
				<div key={r.id} className="p-6 rounded-xl bg-blue-50 border border-blue-100 shadow hover:shadow-md transition flex flex-col w-full lg:w-80">
					<h3 className="font-semibold text-blue-800 text-lg mb-2">{r.title}</h3>
					<p className="text-sm text-gray-700 mb-1">{r.type}</p>
					<p className="text-xs text-gray-500 mb-2">{r.desc}</p>
					<a href={r.url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 underline mt-auto">Open Resource</a>
				</div>
			))}
</div>
</section>
)
}