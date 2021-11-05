const app = new Vue({
    el: "#app",

    data: {
        contacts: [
            {
                name: 'Michele',
                avatar: '_1',
                visible: true,
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
        getImageUrl(num) {
            const imgUrl = `./img/avatar${num}.jpg`
            return imgUrl;
        },

        changeChat(i) {
            this.contacts.forEach((element, index) => {
                document.querySelectorAll(".chat_user")[index].classList.remove("activeitem")
            });
            document.querySelectorAll(".chat_user")[i].classList.add("activeitem")
            this.activeItems = i;

        },
        chatInsert(i) {
            var chatFinder = this.contacts[i].messages;

            const tmp_a = {
                date: '10/01/2020 15:50:00',
                text: document.getElementById("input_chat").value,
                status: 'sent'
            }

            chatFinder.push(tmp_a)

            setTimeout(setReply, 1000);

            function setReply() {
                const today = new Date();

                const autoReply = {
                    date: dayjs(today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()).format('DD/MM/YYYY') + ' ' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds(),
                    text: 'ok',
                    status: 'received'
                }
                chatFinder.push(autoReply);

            }
            document.getElementById("input_chat").value = "";
        },
        findUser() {
            this.contacts.forEach((element, index) => {
                this.contacts[index].visible = true;
                console.log(document.getElementById("chat_finder").value)
                const finder = this.contacts[index].name.slice(0, Object.keys(document.getElementById("chat_finder").value).length)
                if (document.getElementById("chat_finder").value.toLowerCase() != finder.toLowerCase()) {
                    this.contacts[index].visible = false;
                }
            })
        }
    }
})
document.querySelector(".chat_user").classList.add("activeitem")