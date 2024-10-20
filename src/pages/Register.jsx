import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RegisterUser } from '../services/Auth'

const Register = () => {
  let navigate = useNavigate()

  const initialState = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    profilePicture: null
  }
  const [formValues, setFormValues] = useState(initialState)
  const [previewImage, setPreviewImage] = useState(null)

  const handleChange = (e) => {
    if (e.target.name === 'profilePicture') {
      setFormValues({ ...formValues, profilePicture: e.target.files[0] })
      setPreviewImage(URL.createObjectURL(e.target.files[0]))
    } else {
      setFormValues({ ...formValues, [e.target.name]: e.target.value })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('name', formValues.name)
    formData.append('email', formValues.email)
    formData.append('password', formValues.password)
    if (formValues.profilePicture) {
      formData.append('profilePicture', formValues.profilePicture)
    }

    await RegisterUser(formData)
    setFormValues(initialState)
    setPreviewImage(null)
    navigate('/signIn')
  }

  return (
    <div className="signin col">
      <div className="card-overlay centered">
        <form
          className="col"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div className="input-wrapper">
            <label htmlFor="name">Username</label>
            <input
              onChange={handleChange}
              name="name"
              type="text"
              placeholder="Gorlock The Destroyer"
              value={formValues.name}
              required
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="email">Email</label>
            <input
              onChange={handleChange}
              name="email"
              type="email"
              placeholder="example@example.com"
              value={formValues.email}
              required
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              onChange={handleChange}
              type="password"
              name="password"
              value={formValues.password}
              required
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              onChange={handleChange}
              type="password"
              name="confirmPassword"
              value={formValues.confirmPassword}
              required
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="profilePicture">Profile Picture</label>
            <input
              onChange={handleChange}
              type="file"
              name="profilePicture"
              accept="image/*"
            />
          </div>
          {previewImage && (
            <div className="image-preview">
              <img
                src={previewImage}
                alt="Preview"
                style={{ maxWidth: '200px', maxHeight: '200px' }}
              />
            </div>
          )}
          <button
            className="submit"
            disabled={
              !formValues.email ||
              (!formValues.password &&
                formValues.confirmPassword === formValues.password)
            }
          >
            Register
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register
