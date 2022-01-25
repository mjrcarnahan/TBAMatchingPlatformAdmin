import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import Breadcumb from '../../components/Breadcumb'
import Loading from '../../components/Loading'
import ReactPlayer from 'react-player'
import { BsHouse, BsPeople } from 'react-icons/bs'
import { BiBuildingHouse, BiDollar } from 'react-icons/bi'
import { getMaritalId, getMembership } from '../../utils/enum'
import { GET, POST } from '../../utils/crud'
import { useParams } from 'react-router-dom'
import './index.css'

const Profile = () => {
  const [tab, setTab] = useState(0)
  const [loading, setLoading] = useState(false)
  const [profile, setProfile] = useState({
    bio: '',
    city: '',
    city_old: '',
    credit_file_check: '',
    id: '',
    marital_id: '',
    membership_id: '',
    nickname: '',
    obgyn_check: '',
    obgyn_file_check: '',
    obgyn_url: '',
    relationship: '',
    report_check: '',
    report_url: '',
    state: '',
    state_old: '',
    status: '',
    type_id: ''
  })
  const { id } = useParams()

  useEffect(() => {
    const getData = async () => {
      setLoading(true)
      const json = await GET(`/admin/profiles/show?profile_id=${id}`)
      setProfile(json.data)
      setLoading(false)
    }
    getData()
  }, [id])

  const changeStatus = async (e) => {
    const json = await POST('/admin/profiles/status', {
      profile_id: profile.id,
      status: e.target.value
    })
  }
  return (
    <div className="profile">
      <Header />
      {loading ? (
        <Loading />
      ) : (
        <div className="container">
          <Breadcumb type_id={profile.type_id} />
          <h1 className="title">{profile.nickname}</h1>
          <div className="profile-info">
            <div className="profile-tabs">
              <div className="tabs-links">
                <button type="button" className={tab === 0 ? 'active' : ''} onClick={() => setTab(0)}>
                  General Info
                </button>
                <button type="button" className={tab === 1 ? 'active' : ''} onClick={() => setTab(1)}>
                  Surregacy Survey
                </button>
              </div>
              <div className="tabs-content">
                {tab === 0 && (
                  <div className="content">
                    {profile.video && (
                      <ReactPlayer
                        width="100%"
                        height="100%"
                        url={profile?.video_url || '/images/videos/video.mp4'}
                        controls
                      />
                    )}
                    <p>{profile.bio}</p>
                  </div>
                )}
                {tab === 1 && (
                  <div className="content">
                    <table className="profile-questions">
                      <tbody>
                        {[0, 2, 3].map((item) => (
                          <tr key={item}>
                            <td>Question</td>
                            <td>Answer</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
            <div className="profile-detail">
              <div className="status">CURRENT STATUS</div>
              <select name="status" onChange={changeStatus}>
                <option value="">Select Status</option>
                <option value="1">Pending for approval</option>
                <option value="2">Approved</option>
              </select>
              <div className="img">
                <img src="/images/profile.png" alt={profile.nickname} />
              </div>
              <h1 className="title">{profile.nickname}</h1>
              <ul className="list-info">
                <li>
                  <BiBuildingHouse className="icon" />
                  <div>{profile.state}</div>
                </li>
                <li>
                  <BsHouse className="icon" />
                  <div>{profile.city}</div>
                </li>
                <li>
                  <BsPeople className="icon" />
                  <div>{getMaritalId(profile.marital_id)}</div>
                </li>
                <li>
                  <BiDollar className="icon" />
                  <div>{getMembership(profile.membership_id)}</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Profile
