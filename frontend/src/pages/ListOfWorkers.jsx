/* eslint-disable no-unused-vars */
import React from "react";
import UserItem from "../components/UserItem";
import Button from "../components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";

const users = [
  {
    name: "Leslie Alexander",
    email: "leslie.alexander@example.com",
    photo: "https://flowbite.com/docs/images/people/profile-picture-1.jpg",
    position: "Co-Founder / CEO",
    status: "Last seen 3h ago",
  },
  {
    name: "Michael Foster",
    email: "michael.foster@example.com",
    photo: "https://flowbite.com/docs/images/people/profile-picture-2.jpg",
    position: "Co-Founder",
    status: "Last seen 3h ago",
  },
  {
    name: "Dries Vincent",
    email: "dries.vincent@example.com",
    photo: "https://flowbite.com/docs/images/people/profile-picture-3.jpg",
    position: "Business Relations",
    status: "Online",
  },
  {
    name: "Lindsay Walton",
    email: "lindsay.walton@example.com",
    photo: "https://flowbite.com/docs/images/people/profile-picture-4.jpg",
    position: "Front-end Developer",
    status: "Last seen 3h ago",
  },
  {
    name: "Courtney Henry",
    email: "courtney.henry@example.com",
    photo: "https://flowbite.com/docs/images/people/profile-picture-5.jpg",
    position: "Designer",
    status: "Last seen 3h ago",
  },
  {
    name: "Tom Cook",
    email: "tom.cook@example.com",
    photo: "https://flowbite.com/docs/images/people/profile-picture-6.jpg",
    position: "Director of Product",
    status: "Online",
  },
];

const listOfWorks = () => {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <div className="p-5">
        <Button text="Añadir trabajador" icon={faUserPlus} color="red" />
      </div>
      {users.map((user, index) => (
        <UserItem key={index} user={user} />
      ))}
    </div>
  );
};

export default listOfWorks;
