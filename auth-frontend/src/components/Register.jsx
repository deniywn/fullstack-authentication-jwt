import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'http://localhost:5000/register', 
        {
          email: e.target.email.value,
          password: e.target.password.value
        },
        {
          headers: {
            'Content-Type': 'application/json' // ← Tambahkan header ini
          }
        }
      );
      
      console.log('Registrasi sukses:', res.data); // Log response
      navigate('/login'); // Redirect setelah sukses

        }
        catch (err) {
            // Error dari server (contoh: email sudah terdaftar)
            if (err.response) {
                console.error('Server error:', err.response.status, err.response.data);
                alert(`Error: ${err.response.data?.error || 'Registrasi ditolak server'}`);
            
            // Error jaringan (tidak dapat koneksi ke backend)
            } else if (err.request) {
                console.error('Network error:', err.request);
                alert('Tidak bisa terhubung ke server. Cek koneksi atau pastikan backend running.');
            
            // Error lainnya (contoh: salah konfigurasi axios)
            } else {
                console.error('Request setup error:', err.message);
                alert('Terjadi kesalahan saat mengirim data.');
            }
        }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" name="email" placeholder="Email" required />
      <input type="password" name="password" placeholder="Password" required />
      <button type="submit">Register</button>
    </form>
  );
}