import './Section.css';

const Section = ({ title, contents }) => {
   return (
      title && contents && contents.length > 0
      ? <section className='section'>
         <h1>{title}</h1>
         {
            contents.map((content, i) => <p key={`title-${i}`}>{content}</p>)
         }
      </section>
      : ''
   )
}

export default Section;