"use client";

import React from "react";
import Link from "next/link";

const ConfirmMailPage = () => {
  return (
    <div className="flex min-h-screen w-screen items-center justify-center bg-[radial-gradient(circle_at_top,_#f8fbff_0%,_#eef4ff_45%,_#f8fafc_100%)] px-4 py-8 md:px-20 lg:px-40">
      <div className="w-full max-w-5xl overflow-hidden rounded-[36px] border border-slate-200 bg-white shadow-[0_30px_80px_-30px_rgba(15,23,42,0.35)]">
        <div className="flex min-h-[500px] flex-col md:flex-row">
          <div className="flex flex-1 flex-col justify-center p-8 md:p-12">
            <div className="mx-auto w-full max-w-md">
              <Link
                href="/sign-up"
                className="mb-8 inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-2xl text-slate-400 transition-colors hover:text-black"
              >
                ←
              </Link>

              <h1 className="mb-4 text-3xl font-bold leading-tight text-slate-900 md:text-[32px]">
                Check your inbox
              </h1>

              <p className="mb-8 leading-7 text-slate-500">
                Бид таны имэйл хаяг руу баталгаажуулах линк илгээлээ. Тэрхүү
                линк дээр дарж бүртгэлээ идэвхжүүлнэ үү.
              </p>

              <Link
                href="https://mail.google.com"
                target="_blank"
                className="mb-6 block w-full rounded-2xl bg-black py-4 text-center font-medium text-white transition-all hover:bg-gray-800"
              >
                Open Gmail
              </Link>

              <div className="text-center">
                <p className="text-sm text-slate-400">
                  Имэйл ирээгүй юу?{" "}
                  <button
                    type="button"
                    className="font-medium text-blue-600 hover:underline"
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
    </div>
  );
};

export default ConfirmMailPage;
