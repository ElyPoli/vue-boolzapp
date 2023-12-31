"use strict";

const app = Vue.createApp({
    data() {
        return {
            contactsList: [
                {
                    name: "Michele",
                    avatar: "_1",
                    messages: [
                        {
                            date: "10/01/2020 15:30:55",
                            message: "Hai portato a spasso il cane?",
                            status: "sent",
                        },
                        {
                            date: "10/01/2020 15:50:00",
                            message: "Ricordati di dargli da mangiare",
                            status: "sent",
                        },
                        {
                            date: "10/01/2020 16:15:22",
                            message: "Tutto fatto!",
                            status: "received",
                        },
                    ],
                },
                {
                    name: "Fabio",
                    avatar: "_2",
                    messages: [
                        {
                            date: "20/03/2020 16:30:00",
                            message: "Ciao come stai?",
                            status: "sent",
                        },
                        {
                            date: "20/03/2020 16:30:55",
                            message: "Bene grazie! Stasera ci vediamo?",
                            status: "received",
                        },
                        {
                            date: "20/03/2020 16:35:00",
                            message: "Mi piacerebbe ma devo andare a fare la spesa.",
                            status: "received",
                        },
                    ],
                },
                {
                    name: "Samuele",
                    avatar: "_3",
                    messages: [
                        {
                            date: "28/03/2020 10:10:40",
                            message: "La Marianna va in campagna",
                            status: "received",
                        },
                        {
                            date: "28/03/2020 10:20:10",
                            message: "Sicuro di non aver sbagliato chat?",
                            status: "sent",
                        },
                        {
                            date: "28/03/2020 16:15:22",
                            message: "Ah scusa!",
                            status: "received",
                        },
                    ],
                },
                {
                    name: "Luisa",
                    avatar: "_4",
                    messages: [
                        {
                            date: "10/01/2020 15:30:55",
                            message: "Lo sai che ha aperto una nuova pizzeria?",
                            status: "sent",
                        },
                        {
                            date: "10/01/2020 15:50:00",
                            message: "Si, ma preferirei andare al cinema",
                            status: "received",
                        },
                    ],
                },
            ],
            contactOpen: null,
            newMessage:
            {
                date: this.currentDate(),
                message: "",
                status: "",
            },
            searchChat: "",
            notification: false,
        }
    },
    methods: {
        /**
         * Restituisce il percorso completo per l'avatar dell'utente
         * @param {Object} contact 
         * @returns {string}
         */
        contactImgAvatar(contact) {
            return `img/avatar${contact.avatar}.jpg`;
        },
        /**
         * Mostra la chat del contatto selezionato
         * @param {number} i 
         */
        chatOpen(i) {
            this.contactOpen = this.contactsList[i];
        },
        /**
         * Dalla data completa restituisce una stringa con ore e minuti
         * @param {Object} singleMessage 
         * @returns {string}
         */
        formattedTime(singleMessage) {
            let time = singleMessage.date.split(" ");
            let nowTime = time[1].split(":");
            let hours = nowTime[0];
            let minutes = nowTime[1];

            return `${hours}:${minutes}`;
        },
        /**
         * Restituisce una stringa con la data attuale completa
         * @returns {string}
         */
        currentDate() {
            let date = new Date();
            let day = date.getDay();
            let month = date.getMonth();
            let year = date.getFullYear();
            let hours = date.getHours();
            if (hours < 10) {
                hours = `0${hours}`;
            }
            let minutes = date.getMinutes();
            if (minutes < 10) {
                minutes = `0${minutes}`;
            }
            let seconds = date.getSeconds();
            let current = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

            return current;
        },
        /**
         * Aggiunge un nuovo messaggio alla chat corrente e genera una risposta automatica dopo un secondo
         */
        addNewMessage() {
            // Controllo se il messaggio contiene del testo
            if (this.newMessage.message != "") {
                // Creo una copia del nuovo elemento per perdere la reattività
                const cloneNewMessage = { ...this.newMessage };

                cloneNewMessage.status = "sent";
                cloneNewMessage.date = this.currentDate();
                this.contactOpen.messages.push(cloneNewMessage);

                // Svuoto il campo di input
                this.newMessage =
                {
                    date: this.currentDate(),
                    message: "",
                    status: "",
                };

                // Genero la risposta
                setTimeout(this.addAnswer, 1000);

                // Scrollo in automatico fino all'ultimo messaggio inserito
                this.$nextTick(() => {
                    this.$refs.bottomAuto.scrollTop = this.$refs.bottomAuto.scrollHeight;
                });
            }
        },
        /**
         * Aggiunge una risposta automatica alla chat corrente
         */
        addAnswer() {
            // Creo una copia del nuovo elemento per perdere la reattività
            const cloneNewMessage = { ...this.newMessage };

            cloneNewMessage.message = "Ok";
            cloneNewMessage.status = "received";
            cloneNewMessage.date = this.currentDate();
            this.contactOpen.messages.push(cloneNewMessage);

            // Scrollo in automatico fino all'ultimo messaggio inserito
            this.$nextTick(() => {
                this.$refs.bottomAuto.scrollTop = this.$refs.bottomAuto.scrollHeight;
            });
        },
        /**
         * Elimina il messaggio selezionato dalla chat
         * @param {Object} singleMessage 
         */
        deleteMessage(singleMessage) {
            let indexRemove = this.contactOpen.messages.indexOf(singleMessage); // individuo l'indice dell'elemento da eliminare
            this.contactOpen.messages.splice(indexRemove, 1);
        },
        /**
         * Abilita o disabilita le notifiche desktop
         */
        desktopNotification() {
            this.notification = !this.notification;
        },
    },
    beforeMount() {
        this.contactOpen = this.contactsList[0];
    }
})

app.mount("#app");