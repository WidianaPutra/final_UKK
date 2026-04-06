"use client";
import { Class } from "@/app/generated/prisma/client";
import PsStudentForm from "@/components/ps/PsStudentForm";
import axios from "axios";
import { useEffect, useState } from "react";

export default function PsStudentPage() {
  const [classes, setClasses] = useState<Array<Class>>([]);

  const hanldeNInsertStudent = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      const formData = new FormData(e?.currentTarget);

      const classIdValue = formData.get("classId");
      const classId = classIdValue
        ? parseInt(classIdValue.toString(), 10)
        : undefined;

      const response = await axios.post("/api/student", {
        nis: formData.get("nis"),
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        birthday: formData.get("birthday"),
        classId: formData.get("classId"),
      });

      // console.log({
      //   nis: formData.get("nis"),
      //   name: formData.get("name"),
      //   email: formData.get("email"),
      //   phone: formData.get("phone"),
      //   birthday: formData.get("birthday"),
      //   classId,
      // });
    } catch (err) {
      console.log(err);
    }
  };

  const getClassesData = async () => {
    try {
      const classes = await axios.get("/api/class");
      setClasses(classes.data?.data);
    } catch (err: any) {
      console.log(err?.response?.data);
      setClasses([]);
    }
  };

  useEffect(() => {
    getClassesData();
  }, []);
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <PsStudentForm classes={classes} onSubmit={hanldeNInsertStudent} />
    </div>
  );
}
