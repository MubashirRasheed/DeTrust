"use client"
import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const Register = () => {
  const [isBusinessSelected, setIsBusinessSelected] = React.useState(false);
  const [userName, setUserName] = React.useState('');
  const [businessType, setBusinessType] = React.useState('');

  const handleBusinessSelection = (value: string) => {
    setBusinessType(value);
    console.log("Business Type:", value);
    setIsBusinessSelected(value === 'yes');
  };

  const handleDone = () => {
    console.log("User Name:", userName);
    console.log("Business Type: in handle done", businessType);
    // Log additional fields based on business selection
    if (isBusinessSelected) {
      // Log additional fields related to business
      console.log("Domain:", domain);
      console.log("Category:", category);
      console.log("Description:", description);
    }
  };

  const [domain, setDomain] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [description, setDescription] = React.useState('');

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] py-2">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>You are one step away from DeTrust</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">User Name</Label>
                <Input id="name" placeholder="username" value={userName} onChange={(e) => setUserName(e.target.value)} />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Business</Label>
                <Select>
                  <SelectTrigger id="framework">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {/* <SelectItem value="no" onSelect={() => handleBusinessSelection('no')}>no</SelectItem>
                    <SelectItem value="yes" onSelect={() => handleBusinessSelection('yes')}>Yes</SelectItem> */}
                    

                <   SelectItem value="no" onSelect={() => handleBusinessSelection('no')}>no</SelectItem>
                    {/* <SelectItem value="yes" onSelect={() => handleBusinessSelection('yes')}>Yes</SelectItem> */}
                    <SelectItem value="yes" onSelect={(e)=> handleBusinessSelection("yes")}>Yes</SelectItem>


                  </SelectContent>
                </Select>
              </div>
              {/* Additional fields for Business */}
              {isBusinessSelected && (
                <>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="domain">Domain</Label>
                    <Input id="domain" placeholder="Domain" value={domain} onChange={(e) => setDomain(e.target.value)} />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="category">Category</Label>
                    <Input id="category" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="desc">Description</Label>
                    <Input id="desc" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                  </div>
                </>
              )}
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button onClick={handleDone}>Done</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Register
