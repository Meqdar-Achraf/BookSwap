let demandesList
let books
let details_buttons

chargerDemandes()

function chargerDemandes() {
    fetch('http://127.0.0.1:8000/api/v1/exchange-requests?status=open').then (reponse =>{
      if(!reponse.ok) reject(new Error(`Erreur HTTP ${reponse.status}`))
      return reponse.json()})
    .then (data => {return demandesList = [...data.data]})
    .then(array => {
      afficherdemmandes(array)
      details_buttons = document.querySelectorAll(".detail_button")
      afficherdemmandesdettails(details_buttons)
    })
}

// affichage des demmandes 

const container = document.getElementById("demmandesechange")

function afficherdemmandes(demmandes){
  demmandes.forEach( demmande => {
    demmandesCard(demmande)
  });
}

function demmandesCard(demmande){
  const card = `<article class="border-1 border-slate-200 rounded-lg p-3.5 bg-sky-50" data-livre="${demmande.id}">
                ${demmandesCardTop(demmande.book)}
                ${demmandesCardBottom(demmande.exchange_type, demmande.start_date, demmande.end_date,demmande.id)}
                </article>`
                container.innerHTML +=card
}

function demmandesCardTop(book){
  const top = `<div class="flex gap-2.5 border-be-2 border-slate-300 pb-3">
              <img
                src="http://127.0.0.1:8000${book.image_url}"
                width="100px"
                height="200px"
                alt=""
                class="rounded-lg"
              />
              <div class="pl-5">
                <h3 class="font-bold text-lg text-[#131c4c]">${book.title}</h3>
                <address class="font-normal text-md text-slate-600">
                  ${book.author}
                </address>
                <p
                  class="font-small text-md text-slate-700 px-5 py-1 mt-2 rounded-full bg-slate-300 max-w-50 flex justify-center"
                >
                  ${book.category.name}
                </p>
                  <p
                    class="text-sm font-normal text-gray-600 flex justify-evenly mt-3 -ml-2 max-w-[100%]"
                  >
                   ${book.description}
                  </p>
              </div>
            </div>`
            return top;
}

function demmandesCardBottom(type, startdate, enddate,ID){
  const bottom = `<div class="my-3 flex items-center justify-between px-5">

              <div class="bg-slate-300 p-1.5 rounded-xl">
                <span class="flex items-center font-bold text-lg text-[#131c4c]"
                  ><i class="fa-solid fa-calendar-days"></i>échange
                  ${type}</span
                >
                <h4 class="font-normal text-sm text-slate-600 pb-.5 px-2">
                  du ${startdate} au ${enddate}
                </h4>
              </div> 
              <button type="button" data-demmande=${ID} class="detail_button text-lg font-semibold text[#131c4c] p-3.5 px-7.5 bg-sky-500 rounded-xl hover:bg-blue-500 hover:cursor-pointer">Voir details</button>
            </div>`
            return bottom
}

// affichage des details de demmandes

function openModal(buttonID){
  document.getElementById(buttonID).classList.remove('hidden')
}
function closeModal(buttonID){
  document.getElementById(buttonID).classList.add('hidden')
}
 
function afficherdemmandesdettails(buttons){
  buttons.forEach(button => {
    button.addEventListener('click', ()=>{
      
    })
  })
}

// getbooks()







// function afficherlivres(books){
//   books.forEach(book => {
//     const card =`<article>
//     ${book.title}
//     </article>`
//     document.getElementById("books-cards").innerHTML += card
//   });

// }






























