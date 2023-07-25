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
            currentIndex: 0,
            newMessage: [
                {
                    date: this.currentDate(),
                    message: "",
                    status: "",
                },
            ],
        }
    },
    methods: {
        contactImgAvatar(contact) {
            return `img/avatar${contact.avatar}.jpg`;
        },
        chatOpen(i) {
            this.contactOpen = this.contactsList[i];
        },
        formattedTime(singleMessage) {
            let time = singleMessage.date.split(" ");
            let nowTime = time[1].split(":");
            let hours = nowTime[0];
            let minutes = nowTime[1];

            return `${hours}:${minutes}`;
        },
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
        addNewMessage() {
            // Creo una copia del nuovo elemento per perdere la reattività
            const cloneNewMessage = { ...this.newMessage };

            cloneNewMessage.status = "sent";
            cloneNewMessage.date = this.currentDate();
            this.contactOpen.messages.push(cloneNewMessage);

            // Svuoto il campo di input
            this.newMessage = [
                {
                    date: this.currentDate(),
                    message: "",
                    status: "",
                },
            ];
        },
    },
    beforeMount() {
        this.contactOpen = this.contactsList[0];
    }
})

app.mount("#app");