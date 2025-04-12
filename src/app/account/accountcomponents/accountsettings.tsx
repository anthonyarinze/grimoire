"use client";

import React, { useState } from "react";
import { useLogout } from "@/app/hooks/uselogout";
import { useDeleteAccount } from "@/app/hooks/usedeleteaccount";
import ConfirmDialog from "@/app/components/ui/confirmdialog";

export default function AccountSettings() {
  const { logout, isPending: isLoggingOut } = useLogout();
  const { deleteAccount, isPending: isDeleting } = useDeleteAccount();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  return (
    <section className="mt-8">
      <h2 className="text-lg font-semibold mb-4">Account Settings</h2>
      <div className="flex flex-col gap-3">
        <button
          onClick={() => setShowLogoutConfirm(true)}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Sign Out
        </button>
        <button
          onClick={() => setShowDeleteConfirm(true)}
          className="text-red-500 hover:underline text-sm"
        >
          Delete My Account
        </button>
      </div>

      {/* Confirmation Modals */}
      <ConfirmDialog
        isPending={isLoggingOut}
        isOpen={showLogoutConfirm}
        onConfirm={() => {
          setShowLogoutConfirm(false);
          logout();
        }}
        onCancel={() => setShowLogoutConfirm(false)}
        message="Are you sure you want to sign out?"
      />

      <ConfirmDialog
        isPending={isDeleting}
        isOpen={showDeleteConfirm}
        onConfirm={() => {
          setShowDeleteConfirm(false);
          deleteAccount();
        }}
        onCancel={() => setShowDeleteConfirm(false)}
        message="Are you sure you want to delete your account? This action is irreversible."
        confirmText="Delete"
      />
    </section>
  );
}
