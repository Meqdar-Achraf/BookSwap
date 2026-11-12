let demandesList;
let books;
let details_buttons;

chargerDemandes();

function chargerDemandes() {
  fetch("http://127.0.0.1:8000/api/v1/exchange-requests?status=open")
    .then((reponse) => {
      if (!reponse.ok) reject(new Error(`Erreur HTTP ${reponse.status}`));
      return reponse.json();
    })
    .then((data) => {
      return (demandesList = [...data.data]);
    })
    .then((array) => {
      console.log(array);
      afficherdemmandes(array);
      details_buttons = document.querySelectorAll(".detail_button");
      afficherdemmandesdettails(details_buttons, array);
    });
}

// affichage des demmandes

const container = document.getElementById("demmandesechange");

function afficherdemmandes(demmandes) {
  demmandes.forEach((demmande) => {
    demmandesCard(demmande);
  });
}

function demmandesCard(demmande) {
  const card = `<article class="border-1 border-slate-200 rounded-lg p-3.5 bg-sky-50" data-livre="${demmande.id}">
                ${demmandesCardTop(demmande.book)}
                ${demmandesCardBottom(demmande.exchange_type, demmande.start_date, demmande.end_date, demmande.id)}
                </article>`;
  container.innerHTML += card;
}

function demmandesCardTop(book) {
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
            </div>`;
  return top;
}

function demmandesCardBottom(type, startdate, enddate, ID) {
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
            </div>`;
  return bottom;
}

// affichage des details de demmandes

function openModal(modalID) {
  document.getElementById(modalID).classList.remove("hidden");
}
function closeModal(modalID) {
  document.getElementById(modalID).classList.add("hidden");
}

function afficherdemmandesdettails(buttons, demmandes) {
  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      openModal("demmandes_info-maodal");
      const demmandeID = event.target.dataset.demmande;
      const demmande = demmandes.find((demmande) => demmande.id == demmandeID);
      modaledemmandeInformation(demmande);
      return demmande;
    });
  });
}

// afficher les details de demmande dans le modale
function modaledemmandeInformation(demmande) {
  document
    .getElementById("book_image")
    .setAttribute("src", `http://127.0.0.1:8000${demmande.book.image_url}`);
  document.getElementById("book_name").innerText = demmande.book.title;
  document.getElementById("book_author").innerText = demmande.book.author;
  document.getElementById("book_category").innerText =
    demmande.book.category.name;
  document.getElementById("book_description").innerText =
    demmande.book.description;
  document.getElementById("demmande_type").innerHTML =
    `<i class="fa-solid fa-calendar-days "></i>échange ${demmande.exchange_type}`;
  document.getElementById("start_date").innerText =
    `échange ${demmande.start_date}`;
  document.getElementById("Demande_status").innerText =
    `échange ${demmande.status}`;
  document
    .getElementById("owner_profile")
    .setAttribute("src", `http://127.0.0.1:8000${demmande.owner.avatar}`);
  document.getElementById("owner_name").innerText =
    `${demmande.owner.name}`;
    modaleoffresInfo(demmande)
}
function modaleoffresInfo(demmande) {
  const offer_container = document.getElementById('offres')
  offer_container.innerHTML = ""
  offer_container.innerHTML += `<h3 id="offres_count" class="text-3xl text-sky-900 font-bold my-10">Offres: {${demmande.offers_count}}</h3>`

  demmande.offers.forEach((offre) => {
    const offre_card = `
    <article class="border-2 border-slate-300 rounded-xl p-3 my-2">
      <div class="flex justify-between">
      ${offersbook(offre.offered_book)}
      ${offeroperation(offre)}
      </div>
      <div id="demande_offre-author" class="flex items-center gap-2">
      ${offerOwner(offre.author)}
      </div>
      </article>  `;
    document.getElementById('offres').innerHTML +=offre_card
  });
}

function offersbook(book) {
  const book_info = `<div class="flex gap-2.5 border-be-2 border-slate-300 pb-3 mb-5 max-w-[60%]">
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
                    class="font-small text-md text-slate-700 px-5 py-1 mt-2 rounded-full bg-slate-300 max-w-40"
                  >
                    ${book.category.name}
                  </p>
                  <p
                    class="text-sm font-normal text-gray-600 flex justify-evenly mt-3 -ml-2 max-w-[100%]"
                  >
                  ${book.description}
                  </p>
                </div>
              </div>`;
  return book_info;
}
function offeroperation(offer) {
  const operation = `
  <div class="bg-sky-200 rounded-xl p-2.5 w-60 h-40">
                <h2 class="flex items-center font-bold text-lg text-[#131c4c] mb-2"
                  ><i class="fa-solid fa-calendar-days "></i>échange
                  ${offer.exchange_type}</h2
                >
                <p class="font-semibold text-slate-600 text-md">Date de debut:</p>
                <h4 class="font-normal text-sm text-slate-600 pb-.5 px-2">${offer.start_date}</h4>
                <p class="font-semibold text-slate-600 text-md">Status: <span class="font-semibold text-slate-800 text-md" >${offer.status}</span></p>
              </div>`;
  return operation;
}
function offerOwner(owner) {
  const authorOffer = `
    <div>
      <img src="http://127.0.0.1:8000${owner.avatar}" class="h-10 w-10 rounded-full" alt="" />
    </div>
    <div>
      <h4 class="text-lg text-slate-700 font-semibold">${owner.name}</h4>
    </div>`;
    return authorOffer
}
document.getElementById("close_modale").addEventListener('click', ()=> closeModal("demmandes_info-maodal"))

