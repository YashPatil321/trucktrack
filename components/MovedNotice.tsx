"use client";

import { useEffect, useState } from "react";

const NEW_SITE_URL = "https://mantelkeep.com";
const DISMISS_KEY = "tradesmonk-moved-notice-dismissed";

export default function MovedNotice() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    try {
      if (window.sessionStorage.getItem(DISMISS_KEY) !== "true") {
        setShowModal(true);
      }
    } catch {
      // sessionStorage can be unavailable (private mode, blocked cookies)
      setShowModal(true);
    }
  }, []);

  const dismissModal = () => {
    setShowModal(false);
    try {
      window.sessionStorage.setItem(DISMISS_KEY, "true");
    } catch {
      // ignore - the notice simply shows again on the next page load
    }
  };

  return (
    <>
      {/* Always-visible banner across every page */}
      <div className="w-full bg-amber-400 text-black text-center text-sm sm:text-base px-4 py-3 font-medium">
        Thank you for supporting TradesMonk! We&apos;ve moved to{" "}
        <a
          href={NEW_SITE_URL}
          className="underline font-bold hover:text-gray-800"
        >
          mantelkeep.com
        </a>
      </div>

      {/* One-time welcome message per visit */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="moved-notice-title"
          onClick={dismissModal}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <h2
              id="moved-notice-title"
              className="text-2xl font-bold text-gray-900 mb-3"
            >
              Thank you!
            </h2>
            <p className="text-gray-700 mb-2">
              Thank you for being part of the TradesMonk community &mdash; we
              truly appreciate your support.
            </p>
            <p className="text-gray-700 mb-6">
              We&apos;ve moved to a new home at{" "}
              <a href={NEW_SITE_URL} className="text-blue-600 font-semibold underline">
                mantelkeep.com
              </a>
              . Come visit us there!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={NEW_SITE_URL}
                className="px-5 py-2.5 rounded-lg bg-black text-white font-semibold hover:bg-gray-800"
              >
                Go to mantelkeep.com
              </a>
              <button
                type="button"
                onClick={dismissModal}
                className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50"
              >
                Stay here for now
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
