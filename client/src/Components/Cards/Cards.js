import './Cards.css';

const Cards = ({ mainTitle, datas }) => {
   return(
      <section className='card-container'>
         <h2 className='main-title'>{mainTitle}</h2>
         {
            datas.map((element, i) => {
               const { title, data } = element;
               return(
                  <div className='card' key={ i }>
                     <h3>{ title }</h3>
                     <p type='number'>{ data }</p>
                  </div>   
               )
            })
         }
      </section>
   )
}

export default Cards;