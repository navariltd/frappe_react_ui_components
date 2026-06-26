"use client";

import { BaseLayout } from "@/components/layouts/base-layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { File, Upload, X } from "lucide-react";
import { useState } from "react";

export default function FileUploadsPage() {
  const [files, setFiles] = useState<string[]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList) {
      const fileNames = Array.from(fileList).map((file) => file.name);
      setFiles([...files, ...fileNames]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <BaseLayout title="File Uploads" description="File upload components">
      <div className="flex flex-col gap-6">
        <div className="@container/main px-4 lg:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Upload</CardTitle>
                <CardDescription>Single file upload</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="file">Upload File</Label>
                  <Input type="file" id="file" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Multiple Files</CardTitle>
                <CardDescription>Upload multiple files at once</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="files">Upload Files</Label>
                  <Input type="file" id="files" multiple />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Drag & Drop</CardTitle>
                <CardDescription>
                  File upload with drag and drop
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-primary transition-colors">
                  <Upload className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Drag and drop files here or click to browse
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() =>
                      document.getElementById("drag-upload")?.click()
                    }
                  >
                    Choose Files
                  </Button>
                  <Input
                    type="file"
                    id="drag-upload"
                    className="hidden"
                    multiple
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upload List</CardTitle>
                <CardDescription>
                  Files uploaded with remove option
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Input type="file" onChange={handleFileUpload} multiple />
                  </div>
                  {files.length > 0 && (
                    <div className="space-y-2">
                      {files.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-2 bg-muted rounded-md"
                        >
                          <div className="flex items-center gap-2">
                            <File className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{file}</span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}
