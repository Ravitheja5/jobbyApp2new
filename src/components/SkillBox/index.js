import './index.css'

const SkillBox = props => {
  const {skillsData} = props
  const {imageUrl, name} = skillsData
  return (
    <div className="skill-box">
      <img src={imageUrl} alt={name} className="skill-image" />
      <p className="skill-para">{name}</p>
    </div>
  )
}
export default SkillBox
