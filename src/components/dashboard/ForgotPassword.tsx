import React, { useState } from 'react';
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from '~/components/ui/drawer'; // Import your Drawer components here
import { Button } from '../ui/button';
import { sentPasswordResetLink } from './Settings';

const ForgotPassword = () => {
  const [isOpen, setIsOpen] = useState(false);
const [email, setEmail] = useState('')
const [loading,setLoading]=useState(false)
const resetPassword=async()=>{
    setLoading(true)
    if(!email.includes('@')) return ;
    await sentPasswordResetLink(email).finally(()=>setLoading(false))
}
  return (
    <div>
      {/* The "Forgot Password?" link that triggers the Drawer */}
      <a href="#" onClick={() => setIsOpen(true)} className="text-blue-500 text-sm">
        Forget Password?
      </a>

      {/* Drawer Component */}
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger asChild>
          {/* Optionally add a hidden trigger if needed */}
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Reset Password</DrawerTitle>
            <DrawerDescription>
              Please enter your email to reset your password.
            </DrawerDescription>
          </DrawerHeader>

          {/* Input field inside the Drawer */}
          <div className="p-4">
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          {/* Footer with Submit and Cancel buttons */}
          <DrawerFooter>
            <Button disabled={loading} onClick={resetPassword} variant="secondary">Submit</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default ForgotPassword;
