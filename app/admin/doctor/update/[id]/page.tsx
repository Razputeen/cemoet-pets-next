"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function EditDoctorPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [doctor, setDoctor] = useState({
    name: "", speciality: "", email: "", noTelp: "", description: ""
  })

  useEffect(() => {
    fetch(`http://localhost:3222/doctors/${params.id}`)
      .then(res => res.json())
      .then(data => setDoctor(data))
  }, [params.id])

  const handleChange = (e: any) => {
    setDoctor({ ...doctor, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    await fetch(`http://localhost:3222/doctors/${params.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(doctor)
    })
    router.push("/admin/doctor")
  }

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h1 className="text-2xl mb-4 font-bold">Edit Doctor</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" value={doctor.name} onChange={handleChange} className="w-full border p-2" placeholder="Name" />
        <input name="speciality" value={doctor.speciality} onChange={handleChange} className="w-full border p-2" placeholder="Speciality" />
        <input name="email" value={doctor.email} onChange={handleChange} className="w-full border p-2" placeholder="Email" />
        <input name="noTelp" value={doctor.noTelp} onChange={handleChange} className="w-full border p-2" placeholder="No. Telp" />
        <textarea name="description" value={doctor.description} onChange={handleChange} className="w-full border p-2" placeholder="Description" />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Update</button>
      </form>
    </div>
  )
}
