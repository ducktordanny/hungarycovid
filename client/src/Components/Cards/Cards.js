import './Cards.css';

const Cards = ({ mainTitle, datas, tag }) => {
   return(
      <section className='card-container'>
         <h2 className='main-title'>{mainTitle}</h2>
         {
            datas.map((element, i) => {
               const { title, data } = element;
               return(
                  <div className='card' key={ i }>
                     <p>{ title }</p>
                     <div className='line'></div>
                     <h3>{ tag ? `${data} ${tag}` : data }</h3>
                  </div>
               )
            })
         }
      </section>
   )
}

export default Cards;