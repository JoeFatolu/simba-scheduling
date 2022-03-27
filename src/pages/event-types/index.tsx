import React from "react";
import prisma from "@lib/prisma";
import Shell from "../../components/shell";
import Head from "next/head";
import Link from "next/link";
import Button from "../../components/button";
import Input from "../../components/input";
import { useFormik } from "formik";
import Modal from "@lib/modal";
import * as yup from "yup";
import { toast } from "react-toast";

const createEventVerification = yup.object({
  title: yup.string(),
  name: yup.string(),
  email: yup.string(),
  number: yup.string(),
});

const EventTypesPage = (props) => {
  const [showModal, setShowModal] = React.useState(false);
  const CreateFirstEventTypeView = () => (
    <div className="md:py-20">
      <div className="block mx-auto text-center md:max-w-screen-sm">
        <h3 className="mt-2 text-xl font-bold text-neutral-900">Create your first event type</h3>
        <p className="mt-1 mb-2 text-md text-neutral-600">Event types enable you to share links that show available times on your calendar and allow people to make bookings with you.</p>
        <Button onClick={() => setShowModal(true)}>Book Event</Button>
        <CreateNewEventDialog isOpen={showModal} onClose={() => setShowModal(false)} />
      </div>
    </div>
  );

  return (
    <div>
      <Head>
        <title>Event Types | Calendso</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Shell heading="Event Types" subtitle="Create events to share for people to book on your calendar.">
        {props.eventTypes.length === 0 && <CreateFirstEventTypeView />}
      </Shell>
    </div>
  );
};

export async function getServerSideProps(context) {
  return {
    props: {
      user: { name: "IFe Fatolu", slug: "Ife" },
      eventTypes: [],
      profile: { slug: "Ife" },
      profiles: [{ slug: "Ife" }],
    },
  };
}

interface createEvent {
  title: string;
  email: string;
  name: string;
  time: string;
}

const CreateNewEventDialog = ({ isOpen, onClose }) => {
  const formik = useFormik<createEvent>({
    initialValues: {
      title: "",
      name: "",
      email: "",
      time: "",
    },
    validationSchema: createEventVerification,
    onSubmit: (values) => {
      fetch("/api/availability/eventtype", {
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      })
        .then((e) => {
          console.log(e);
        })
        .catch((e) => {
          const data = e.toJSON();
          toast.error(data.message);
        });
    },
  });
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-[400px] bg-white p-8 rounded">
        <div className="text-lg font-semibold mb-[30px]">Create an Event</div>
        <form onSubmit={formik.handleSubmit}>
          <Input label="Title" id="title" name="title" value={formik.values.title} onChange={formik.handleChange} error={formik.touched.title && Boolean(formik.errors.title)} helperText={formik.touched.title && formik.errors.title} />
          <Input label="Name" id="name" name="name" value={formik.values.name} onChange={formik.handleChange} error={formik.touched.name && Boolean(formik.errors.name)} helperText={formik.touched.name && formik.errors.name} />
          <Input label="Email Address" id="email" name="email" value={formik.values.email} onChange={formik.handleChange} error={formik.touched.email && Boolean(formik.errors.email)} helperText={formik.touched.email && formik.errors.email} />
          <Input label="Length - Minutes" id="time" name="time" value={formik.values.time} onChange={formik.handleChange} error={formik.touched.time && Boolean(formik.errors.time)} helperText={formik.touched.time && formik.errors.time} />
          <div className="flex justify-between">
            <Button className="p-[10px] w-[100px]" onClick={onClose}>
              Cancel
            </Button>
            <Button className="p-[10px] w-[100px]">Confirm</Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EventTypesPage;
