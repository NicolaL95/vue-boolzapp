/* lettura dell'oggetto data:
                name: nome dell'utente
                avatar: numero collegato all'immagine dell'utente
                visible: Indica se l'utente è visibile o meno nell'interfaccia grafica
                lastMessage: ultimo messaggio ricevuto/inviato dall'/all' utente
                lastDate: data relativa al lastmessage
                lastDateAccess: ultima data in cui il bot ha risposto
                messages: messaggi dell'utente
 */
const app = new Vue({
    el: "#app",
    messageToRemove: "",
    ownerMessage: "",
    data: {
        contacts: [
            {
                name: 'Michele',
                avatar: '_1',
                visible: true,
                lastMessage: "Tutto fatto!",
                lastDate: "10/01/2020 16:15:22",
                lastDateAccess: "10/01/2020 16:15:22",
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        text: 'Hai portato a spasso il cane?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        text: 'Ricordati di dargli da mangiare',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 16:15:22',
                        text: 'Tutto fatto!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Fabio',
                avatar: '_2',
                visible: true,
                lastMessage: "Mi piacerebbe ma devo andare a fare la spesa.",
                lastDate: "20/03/2020 16:35:00",
                lastDateAccess: "20/03/2020 16:30:55",
                messages: [
                    {
                        date: '20/03/2020 16:30:00',
                        text: 'Ciao come stai?',
                        status: 'sent'
                    },
                    {
                        date: '20/03/2020 16:30:55',
                        text: 'Bene grazie! Stasera ci vediamo?',
                        status: 'received'
                    },
                    {
                        date: '20/03/2020 16:35:00',
                        text: 'Mi piacerebbe ma devo andare a fare la spesa.',
                        status: 'sent'
                    }
                ],
            },
            {
                name: 'Samuele',
                avatar: '_3',
                visible: true,
                lastMessage: "Ah scusa!",
                lastDate: "28/03/2020 16:15:22",
                lastDateAccess: "28/03/2020 16:15:22",
                messages: [
                    {
                        date: '28/03/2020 10:10:40',
                        text: 'La Marianna va in campagna',
                        status: 'received'
                    },
                    {
                        date: '28/03/2020 10:20:10',
                        text: 'Sicuro di non aver sbagliato chat?',
                        status: 'sent'
                    },
                    {
                        date: '28/03/2020 16:15:22',
                        text: 'Ah scusa!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Luisa',
                avatar: '_4',
                visible: true,
                lastMessage: "Si, ma preferirei andare al cinema",
                lastDate: "10/01/2020 15:50:00",
                lastDateAccess: "28/03/2020 16:15:22",
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        text: 'Lo sai che ha aperto una nuova pizzeria?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        text: 'Si, ma preferirei andare al cinema',
                        status: 'received'
                    }
                ],
            }
        ],
        activeItems: 0
    },

    methods: {
        /* Ottiene l'url dell'immagine partendo dalla reference nell'oggetto */
        getImageUrl(num) {
            const imgUrl = `../img/avatar${num}.jpg`
            return imgUrl;
        },
        /* Cambia tutti i valori relativi all'utente nella DOM per visualizzare l'evento corrente */
        changeChat(i) {
            this.contacts.forEach((element, index) => {
                document.querySelectorAll(".chat_user")[index].classList.remove("activeitem")
            });
            document.querySelectorAll(".chat_user")[i].classList.add("activeitem")
            this.activeItems = i;

        },
        /* Permette di inserire un nuovo messaggio nella chat -Il messaggio viene salvato nell'oggetto */
        /* date: Genera correttamente la data nel rispetto del format imposto dall'esercizio */
        chatInsert(i) {
            var chatFinder = this.contacts[i].messages;
            const today = new Date();

            const tmp_a = {
                date: dayjs(today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()).format('DD/MM/YYYY') + ' ' + today.getHours() + ":" + (today.getMinutes() > 9 ? today.getMinutes() : ("0" + today.getMinutes())) + ":" + (today.getSeconds() > 9 ? today.getSeconds() : ("0" + today.getSeconds())),
                text: document.getElementById("input_chat").value,
                status: 'sent'
            }

            chatFinder.push(tmp_a)


            this.contacts[i].lastMessage = this.contacts[i].messages[this.contacts[i].messages.length - 1].text
            this.contacts[i].lastDate = this.contacts[i].messages[this.contacts[i].messages.length - 1].date
            setTimeout(setReply, 1000);
            /* Genera una risposta automatica assegnando la data nel rispetto del format imposto dall'esercizio */
            function setReply() {


                const autoReply = {
                    date: dayjs(today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()).format('DD/MM/YYYY') + ' ' + today.getHours() + ":" + (today.getMinutes() > 9 ? today.getMinutes() : ("0" + today.getMinutes())) + ":" + (today.getSeconds() > 9 ? today.getSeconds() : ("0" + today.getSeconds())),
                    text: 'ok',
                    status: 'received'
                }
                chatFinder.push(autoReply);
                app.contacts[i].lastMessage = autoReply.text;
                app.contacts[i].lastDate = autoReply.date;
                app.contacts[i].lastDateAccess = autoReply.date;
            }


            document.getElementById("input_chat").value = "";

        },
        /* Permette di trovare l'utente decidendo  */
        findUser() {
            this.contacts.forEach((element, index) => {
                this.contacts[index].visible = true;
                console.log(document.getElementById("chat_finder").value)
                const finder = this.contacts[index].name.slice(0, Object.keys(document.getElementById("chat_finder").value).length)
                if (document.getElementById("chat_finder").value.toLowerCase() != finder.toLowerCase()) {
                    this.contacts[index].visible = false;
                }
            })
        },
        /* rende visibile il menù per l'eliminazione del messaggio e setta i parametri da passare alla funzione per l'eleminazione vera e propria */
        handler: function (e, selectedMessage, selectedUser) {
            menu = document.querySelector(".rightc")
            e.preventDefault();
            console.log(selectedMessage)
            messageToRemove = selectedMessage;
            ownerMessage = selectedUser
            if (menu.style.display == 'block') {
                menu.style.display = 'none';
            }
            else {
                menu.style.display = 'block';
                menu.style.left = e.pageX + "px";
                menu.style.top = e.pageY + "px";
            }

        },
        /* elimina il messaggio basandosi sui due indici settati in precedenza */
        /* Imposta il messaggio in anteprima nella lista degli utenti come eliminato se è l'ultimo, altrimenti lascia come impostato l'ultimo */
        deleteMessage() {
            app.contacts[ownerMessage].messages.splice(messageToRemove, 1)
            if (app.contacts[ownerMessage].messages[messageToRemove] == app.contacts[ownerMessage].messages[app.contacts[ownerMessage].messages]) {
                app.contacts[ownerMessage].lastMessage = "Questo messaggio è stato eliminato"
            }

        },
        /* permette di togliere la visualizzazione del menù se viene cliccato un qualsiasi elemento del DOM */
        removeMenu() {
            menu = document.querySelector(".rightc")
            if (menu.style.display == 'block') {
                menu.style.display = 'none';
            }
        }
    }
})
document.querySelector(".chat_user").classList.add("activeitem")