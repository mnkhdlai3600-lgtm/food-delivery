"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

const ConfirmMailPage = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-50 px-4 md:px-20 lg:px-40">
      <div className="max-w-5xl w-full bg-white rounded-[32px] overflow-hidden shadow-sm flex flex-col md:flex-row min-h-[500px]">
        <div className="flex-1 p-8 md:p-12 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            <Link
              href="/sign-up"
              className="text-gray-400 hover:text-black mb-8 inline-block transition-colors text-2xl"
            >
              ←
            </Link>

            <h1 className="text-3xl md:text-[32px] font-bold text-gray-900 leading-tight mb-4">
              Check your inbox
            </h1>

            <p className="text-gray-500 mb-8 leading-relaxed">
              Бид таны имэйл хаяг руу баталгаажуулах линк илгээлээ. Тэрхүү линк
              дээр дарж бүртгэлээ идэвхжүүлнэ үү.
            </p>

            <Link
              href="https://mail.google.com"
              target="_blank"
              className="w-full bg-black text-white text-center py-4 rounded-xl font-medium hover:bg-gray-800 transition-all block mb-6"
            >
              Open Gmail
            </Link>

            <div className="text-center">
              <p className="text-sm text-gray-400">
                Имэйл ирээгүй юу?{" "}
                <button
                  type="button"
                  className="text-blue-600 font-medium hover:underline"
                  onClick={() => alert("Дахин илгээлээ!")}
                >
                  Дахин илгээх
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmMailPage;
