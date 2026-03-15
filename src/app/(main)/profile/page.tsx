"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "../context";
import { handleUpdateUser } from "@/lib/services/auth";

import { ProfileActions } from "./_components/ProfileActions";
import { ProfileField } from "./_components/ProfileField";

const ProfilePage = () => {
  const router = useRouter();
  const { isLoggedIn, user, loading, logout, setUser } =
    useContext(UserContext);

  const [isEditing, setIsEditing] = useState(false);

  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userAge, setUserAge] = useState("");
  const [address, setAddress] = useState("");

  const [submitLoading, setSubmitLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      router.push("/");
    }
  }, [loading, isLoggedIn, router]);

  useEffect(() => {
    if (user) {
      setEmail(user.email || "");
      setUserName(user.userName || "");
      setPhoneNumber(user.phoneNumber ? String(user.phoneNumber) : "");
      setUserAge(user.user_age ? String(user.user_age) : "");
      setAddress(user.address || "");
    }
  }, [user]);

  const resetForm = () => {
    setEmail(user?.email || "");
    setUserName(user?.userName || "");
    setPhoneNumber(user?.phoneNumber ? String(user.phoneNumber) : "");
    setUserAge(user?.user_age ? String(user.user_age) : "");
    setAddress(user?.address || "");
  };

  const handleEdit = () => {
    setMessage("");
    setIsEditing(true);
  };

  const handleCancel = () => {
    resetForm();
    setMessage("");
    setIsEditing(false);
  };

  const handleSave = async () => {
    try {
      setSubmitLoading(true);
      setMessage("");

      const body: {
        userName?: string;
        phoneNumber?: number;
        user_age?: number;
        address?: string;
      } = {};

      if (userName.trim()) body.userName = userName.trim();
      if (address.trim()) body.address = address.trim();
      if (phoneNumber.trim()) body.phoneNumber = Number(phoneNumber);
      if (userAge.trim()) body.user_age = Number(userAge);

      const data = await handleUpdateUser(body);
      const updatedUser = data.data || data.user;

      if (updatedUser) {
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
      }

      setMessage("Мэдээлэл амжилттай шинэчлэгдлээ.");
      setIsEditing(false);
    } catch (error: any) {
      setMessage(error.message || "Мэдээлэл шинэчлэхэд алдаа гарлаа.");
    } finally {
      setSubmitLoading(false);
    }
  };

  if (loading) {
    return <div className="p-10 text-white">Loading...</div>;
  }

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="container mx-auto min-h-screen px-6 py-10 text-white">
      <h1 className="text-3xl font-bold">Profile</h1>

      <div className="mt-6 space-y-5 rounded-2xl bg-[#18181B] p-6">
        <ProfileField
          label="Имэйл"
          value={email}
          onChange={setEmail}
          disabled={true}
          placeholder="Имэйл"
        />

        <ProfileField
          label="Хэрэглэгчийн нэр"
          value={userName}
          onChange={setUserName}
          disabled={!isEditing}
          placeholder="Хэрэглэгчийн нэр"
        />

        <ProfileField
          label="Утасны дугаар"
          value={phoneNumber}
          onChange={setPhoneNumber}
          disabled={!isEditing}
          placeholder="Утасны дугаар"
        />

        <ProfileField
          label="Нас"
          value={userAge}
          onChange={setUserAge}
          disabled={!isEditing}
          placeholder="Нас"
        />

        <ProfileField
          label="Хаяг"
          value={address}
          onChange={setAddress}
          disabled={!isEditing}
          placeholder="Хаяг"
        />

        {message && <p className="text-sm text-red-400">{message}</p>}

        <ProfileActions
          isEditing={isEditing}
          submitLoading={submitLoading}
          onEdit={handleEdit}
          onSave={handleSave}
          onCancel={handleCancel}
          onLogout={logout}
          onBack={() => router.push("/")}
        />
      </div>
    </div>
  );
};

export default ProfilePage;
