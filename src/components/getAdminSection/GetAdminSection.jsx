import React from 'react'
import { useEffect, useState } from 'react'
import styles from './GetAdminSection.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUserByAdminThunk, getAllUsersByAdminThunk } from '../../redux/slice/adminAuthSlice'
import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";


const GetAdminSection = () => {
  const dispatch = useDispatch()
  const { adminAuth } = useSelector(state => state.adminAuth)

  useEffect(() => {
    dispatch(getAllUsersByAdminThunk())
  }, [dispatch])

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const students = adminAuth
    .filter(item => item.role === 'admin')
    .sort((a, b) => a.name.localeCompare(b.name));

  const filteredStudents = students.filter(item => {
    const matchesName = item.name.toLowerCase().includes(name.toLowerCase());
    const matchesEmail = item.email.toLowerCase().includes(email.toLowerCase());
    return matchesName && matchesEmail;
  });

  return (
    <div className={styles.section}>
      <div className={styles.content}>
        <div className={styles.searchBox}>
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAh1BMVEX///8BAQEAAAD8/PwFBQXR0dE/Pz/d3d35+fnw8PDb29v19fXW1tbT09Ph4eHl5eWioqJXV1ewsLClpaW8vLyMjIxcXFw6OjqEhIQnJyeBgYEODg4xMTFjY2Pp6em4uLhKSkpzc3PDw8McHBwrKyuZmZlra2sjIyNJSUk3NzeTk5MXFxd6enrVTUJvAAAQGklEQVR4nO1dC1fqOBAuSSstD3kjbxBB8Or//303k7TQ0kk6LQnoOZ3d9bgqSb5mMpl3Pa+mmmqqqaaaaqqppppqqqmmmmpyTvzZC7ibOBcYNp0Ap87m72PkXnhcMT2t+uGzl3gfca97AiCNhvj3llgDfjXvPHuRdxAPvT1TAHUEv90/e53ViXs9xnwDPrWR/ubZC61M3PtkvhGf2sbPZy+0Om2MHHpl1OjZC61MQwJAwDj8s3fGjAJQnNTZn0W4Jm1hg63/LMIDEeHhryIMacdQyJr2H0XYIiJssL+q12zJCIfPXmol4t6ECLDBJs9ebEWaEjQahXD67KVWIs5X5D1cPXuxOVKGbbAPIvhe80cRRWdTCDV6mxp5s9/uXx9vKofDuTSMXrZaiB0qQIEQF6bC/PK2ah7/waYyf32RZq0v5p7qjJ8hFWDD1wrTzUDM4/ugnr89bh/FnjXhqYJtl5iwPDd5CVGqEaZinjEwuvxPfPVfH4bQe72eMOaLfVzkAYofDEogHGC8Hv6kT7L4/vUh+AS1fMCVcJhgIrbq5Pcw+C6B8DvIH7POivnL9BiMNR/AqOJRd5Ys41iSfHS8/h4W0VnMyZJULf606MrPx8N43lFxZ+avlk3X+GLfS27p4keDKEbIvaj/ZfY/YQhBlozaCTwvGrC8viD+puc530YhZPz81HAat/EfvAM6ojZzIcnsjP201CBbmAUZQzKqQ1Isiu2O3IMf8XC7U+U/LLWDagg1yLSrRIxmBMeMmpGiuV0QbDYesEL/YQFOgXH8pWdx8Zum55BRX038J9kMmOsuhGoQ/RAOLw1gUbP/Wv7TKCdikFEaBTwOZ9HJHgpNZnnf4i2R2GJHEI0s+lBywqhFLPpQYg4uDQ6q2rOBXUkwal5PvJOav4ZFgUDi2tzFMATH4C/aQqVhWDyL0h58NqZbinVUSxR+WWNRa09KMOqXvZPYt7EuX8LzlUZgQWyJTexbkzb3rwdNxLhzSKGFW8InbsJ7lWlBh93npD/cjsfj7bA/+Twf2MUIqTi4+HTLEsJxxcftxxbR97ofbG69FOEmGK2/Y129KsSxJYTEYDWyAkG7kebikkeoObrH3rIW0RlXWYA0g3ZD8Etw6YrLCAX5I+Whaw93kl3Lw7SXilP6NmTShevPqGrH62yJeGUICK3diN8l3RLy+PUjoikOvvuoX0G2spW122JYiolgA/3+LV+aKIQ/7vvl/Dvs4vu6n8B9TfdNwAGctStM0p6xErwqphnYAijEwoYeRhLPdtAyxNwMEL3mjs6q4mlYzIfjMseQ+GRBhGPwuPZ/Uj8bERkVbhhbl2FMPzT+YeyMPNkYT298/Hlff/4cx9IhiO5y70zKhROH5seyCcxXhRMzeQJ1/NldHFIq6XzWRWfhXjgrhgia3ldY/iCYKPSCwol9PYd64xeWiBHlEZXRYwkqgxC+bItmko5Z214M8bz6ZuVKhi4C/KPBS86WAJxvQazuZP/e6/hmv6wvrq6+VXhqmd6gYF423+ASZIGJDzAX2SxEP9E7mKaCZzlw4jDdmFRkCJNG+TMo/j/a6ZxYYqt2UT5ADp8x5fzB9kduXMJbrTyFx3rAMkZCb3PSPhe4O0+4bhedTJto+6JIiGuvDODCOf5YN77pmhHglxEqEw0QGVu4AggeKXRasYM+ouaD7H8rFItvIYKQe3o1SnzCDUIg3NpXUhRd53uRigKBVXwu3fVkXZnJEJ5AIiPcCK9xOLlFqhDT2rFD3FvlSpDKBQfojmhT0TknWF0gGTl2FLk3wy0aDcNYAMghnTI/o0B91nzkSMzVP+Is7r3gYthVsibnTWwLYQ82uIoY0gwSMQBqTuKJLQ1H4UNPiQ3sUPl4QYgAPaQ50RjuM0uMKSzn5L2C/UmgtuaJak3tHdFiF6qNfggUodh0Fwj7CEBDlIsXF65dB8HNdV3Qy7cYsUjTV34ySC3RZKHDVUEMWIkHofUpTZCnBGEnFwg7CM8JgEvcPJCLI+GTa57pZm1rMrBQA/pOWqA8J/hFp0PtSiDcaafto54by6qplFt8jj9MPbecSiD80M+Nag1szi8rswBQfg1wDcpga9N9yEIk6YdBBZxvl02jznAyQDN+2VJbkyUfPh2ijtW5F+F6zcduMuxuKu9hvPu83RXYknp6bB6thKBXrjWkVmNYKlqnGa9pNRA422rJ5dCKRzecrefXeDSucRvVpxJZcOzbMM4rLuKuMNlhOhuWdYBvPpNt019pKnKgf3LkoqCisiB90j+TV7JyT36WwBg3CmgU50EaY7DEGlk50No0kLE0Jb5MmN7OzBPnXVIMSAxtdCeQbKd4qKNpoIhyosGtRZav4QcxSGEObxV7yS8Doa7khLhHDEmxE9WBc6QGmkamUXj7m2xbfJvijVwYUaSBwJSmYSwOwsQLMxqi0g1FRPhuHoiWSCAk34qm5Rjy8bMjfpsUfKhMoNpORiaFkZbU2B4tdaFLLTIv7NhxJoYCdX6eC30SvQVEWYNqoNh4xmNIHskHMV9wfDDdFEVoZIayCClOvWlxzFrqDUWnp8SSrCIsUiKka96suzHKOJ7Bxe8U4aFoB2URqHkQULgITvqQ1mHDNsJdUU4Q8N4/42CgiPyjpBadn4DQJzU/goicfjQoYdbEZW6IpuPa3kNSqweIPmjGA+8EtV8EzatlG2HhZeEpRh3KLNn8oHAGh0RXCy3T3CpCpq+hz1Hrhcn8iewAYj1vxCxmTqztt42QGqjkHh/d5o/I7JoRPX1x+xQupYdiAeNLkrke03lYxq9CS1N+HkJJzePgFKM7DY4l42PPQFgl5YNvmkEQtHrSw/zrERqiKcVU1vX3lHNIlKUFSHiSsV9AT5ClDWY/ec5AT7gPSTpNNJ587l7MtFtPxjJfzLiTz9FpDHopFBhsVHcMEn31e+ZA0nP00p1pkM6aYQ00MIpd1h3TNj7BthA6zQF1PchVbmJ81G5mEuVabwmHWPDSMUJdegGPk0To/u7LcFJ24dv4JBtfN1w0pfJndjz/0uTG+pJywxGXhJlP3Hudg/ZZBaGAOO+h29in+ktpGW9kbyIiTLnX9OOoVXmIkH+zRFteUFu9Epto9qgI82FNTv4wPqKvCboSm2qRy/WIoc18WwPutQ9VjuCFwE4+3WZ00dsBkMv1jrTiI4YcxGl5KXozqM+mOYQjUnEgI1dh8PaHLnR/M2Qufji6r+q7oRh1dLsTO+ITP5GLAgM488UVhzJH5LoY6eK+v/VC7qLlpBgwPS4jScbxCzO0/YyrjMsm8xaaS+Ta0BNqyeEAEy/DmHprfRJNCuEuEzRCW7lVgpgVYQUJcvFK3zclk8Ci4WSdqqfDVMzbJjGfVdq0ISsGd3qyWI6XkrMMuJfPf+N26RZn8s/bneFkqs+JyrqsiceFgpClC2lmeNqnpLfpcdysWGDCeeJM4XFeGwZxmVIkiWFMEsiUOG1jEk9cm9N/21ZsOpepG9cTGvvOuDJK5JMWItxdHjSuk2blppUcTI6aaCyVcmeLSdW4F95AUxxZcfCyAi2Qbpt+Kqc81JfhlcbHTpdyr2PppMjK1MVyysX9cFkL1eoqBOg3YitICAKsBALKT5104n/Bn+bkcgwmFjQaiZD9u4w5w5/rm5NqhBG6R9c7EfLP7PRbGiS55VKJyD+BhqN6C1SUSMUmubyij/sBiqM9T8RM6J3x7Fm8UOpegpA8/tCvdU/Ne42nOPE4GW+ED2fOg7sDId54zwfLOtYNSmRc4vhUklvCE9raNWeddtH6QzHj+Xoo9vd5MZbXTF8hox9cf+jhF4acEm6nGGXVxmDxSALgReee4aa9m5KgmKa6SuetWhe/h1FvWBTMQrxKduqm+lASvkEs68ZrgkSt5i89XW4e9aTwc++qllvV4+sef7oeX/ZTLw2RpV3ehtfu+ezN3cuTfvQNIFJNIzhoN6xRhldVjsa/1FTRSeMoAn/FwlUt99hwwli2bURwKOWUAoP2EFxn4tFc70JhzvpiFJhHsolHskYvnBA7PjWUGsb+Xc1Y7gmABv3Pd/U+QfMbOQSej4sXEGTd67TAkyU/lXTTf/VSKQu9D7Mv00VbBR4Wl8BIWZ8W5EHc9dFUOiX7Dw5SF1wYaqVoeiZjkU0lhNDOu7ABRK5PVOfTvFblBszEt7m8B4ufpvVbnxNaCTP1ypnUYiFf4S3ZkeuXFLy3UZRNIJI9lwgzrWyyKRyQBUX8w5LPr7caR7O/U64/OFuKLWPajdKhNOnc6+F2NjKT1X5tUK5Ha5wI2zi6/bBYfNB/Py9T6SXL8/uoe+PnhAczIl4yzHYrpaioquBCcLPtMomx18BGu9fd78f7fXdz8e3wFIMK8+wsU22JEK2+R9jcyCw7NRB0KSujHcuLIlqoE0uMhlq9MsivapQkPe6lX5PGqTWB13ksvhhyXhYhYDyW0TuiIyvfFNpYH12KymYfJKnOCykpjdmVqqtg66c4lofNY82bsa+SOiJvhd2oeCOj0Y5Va3hts593NU+vPJC7vqnkoFkZnoRo6yBW2UO5AKZE6xLryd7eBH3Vk71SepEa39Ye3vt2C3nETuf1rD8absfb4fA4W5/nlY7ezai2+up7pex1bDFxDukN3TemOAPani+l6f73W9gLLV5GtBm94PzNYvTTEgnx9GJR9X419uh8AsFdtLTXl46r93X9LrLeeI/ahuBB5OLNsi1iX4NHkJDMy5alFIyE+G9655PfSMcYLdIvYVSp1/fceL2bRYz6EDYGFnUTIS1mVFAzrIA0D+LsBY9AekZlSaLgneqLsi0Nv3Z1BhVx7b0oK4DYy7iEQyc/RlwCNYXXDGjMfV9eEw4RXsopbh+tbCm2EBZScEcuuzSa5fuAFxqb0W9oCjJsEpaQIY1YYaxJl4R8p3NZf0Q8CnuP3+2BBvIkBz/gFfIIo8IGTq/+inZceUhHqBJi3/qqPyB8kXHkm0PtM6vvPNQQyqh+rmRWvZGEjpCx+eIm1tK/tf59qWw730GgVub18SA+V51M0j58GwbEUh45xkeXZwJz8F3nS7LlZRp37wHOUzqf7jbgdCVzRDWLEO1tx3+uMlVbEuWCuHoBefJ0ZRZTHiIv1UdYUzW9968QHVgTJuq9qdudyRQRjrrwaV0C1PLx7gWhFDgxvTjSRXWkXpPG2ErfWaHES6ANKb9jFWFdUbrh2KbWfrs3Ce+IjNCQWwExqWAfuMm9MFOSv67jHF6iRSv70k+TFH2UbqXxCBqQ99BdOqVbmlBLP6n9sH4dkYWpvVc1Ppg6ZEHjpHriAYR2/UcROny9kVuidbMo6HX9q2lN6iFS0Ov6VxPaLx7B+FdFKbW7UyPJg/+DRClJZM7yYR9Cha9dkxgpbUJ/J6kWBEb9W1pg7n0vDmnPNGUhCp603G29IP1J1Lm8I0NDJ0eviXschceVAd8KMvx+o11UjnqdAKfWnz6BKfrzW1RAkH6IYyT1hKyppppqqqmmmmqqqaaaaqqpJiv0HxMCv9XN30FnAAAAAElFTkSuQmCC"
            alt="Student Icon"
          />
          <div className={styles.inputBox}>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ad"
            />
            <input
              type="text"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-poçt"
            />

          </div>
        </div>

        <div className={styles.tableBox}>
          <table>
            <thead>
              <tr>
                <th>Ad</th>
                <th>Soyad</th>
                <th>Doğum tarixi</th>
                <th>Yaşadığı yer</th>
                <th>E-poçt</th>
                <th>Delete</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map(item => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.lastName}</td>
                    <td>{item.dateOfBirth}</td>
                    <td>{item.location}</td>
                    <td>{item.email}</td>
                    <td><button onClick={() => dispatch(deleteUserByAdminThunk(item._id))}><MdDelete /></button></td>
                    <td><MdModeEdit /></td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">Heç bir admin tapılmadı</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};


export default GetAdminSection