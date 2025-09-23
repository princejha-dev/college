import React, {useEffect, useState} from 'react'
import api from '../api'


export default function Teachers(){
const [teachers, setTeachers] = useState([])


useEffect(()=>{
api.get('/teachers')
.then(r=> setTeachers(r.data))
.catch(()=> console.log('Offline - teachers'))
},[])


return (
	<section className="bg-white p-8 rounded-2xl shadow-lg">
		<div className="flex items-center justify-between mb-6">
			<h2 className="text-2xl font-bold text-blue-700">Teachers</h2>
			<span className="text-sm text-gray-500">{teachers.length} items</span>
		</div>
		<div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
			{teachers.map(t => (
				<div key={t.id} className="p-6 rounded-xl bg-blue-50 border border-blue-100 shadow hover:shadow-md transition">
					<h3 className="font-semibold text-blue-800 text-lg mb-2">{t.name}</h3>
					<p className="text-sm text-gray-700 mb-1">{t.subject}</p>
					<p className="text-xs text-blue-600 mb-2">{t.phone}</p>
				</div>
			))}
		</div>
	</section>
)
}