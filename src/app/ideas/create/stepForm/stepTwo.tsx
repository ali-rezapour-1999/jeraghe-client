import InputSectionWrapper from "@/components/shared/wrapper/inputWrapperSection";
import Editor from "@/components/shared/editor/editor";
import { IsLoading } from "@/components/shared/isLoading";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import IdeaContentFileModal from "@/components/ui/modals/ideaContentFileModal";
import { Heading } from "@/components/ui/text";
import { FormState } from "@/types/ideaStateType";
import { AlertCircle } from "lucide-react";
import React, { useCallback, useEffect } from "react";

interface Props {
  formState: FormState;
  updateForm: (fieldName: keyof FormState, value: any) => void;
  setStep: (step: number) => void;
  initialFormState: FormState;
  editorRef: any;
}

const StepTwo = ({ formState, editorRef, setStep, updateForm }: Props) => {
  const [contentLoading, setContetntLoading] = React.useState(false);
  const [editorContent, setEditorContent] = React.useState("");
  const [contentFile, setContentFile] = React.useState<File | null>(null);
  const isStep2NextDisabled =
    formState.content.trim().length <= 100 && !contentFile;

  const handleEditContentFile = useCallback(() => {
    if (!formState.content) {
      return;
    }
    setContetntLoading(true);
    setTimeout(() => {
      setEditorContent(formState.content);
      setContetntLoading(false);
    }, 500);
  }, [formState.content, setEditorContent]);

  const handleFileUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (
        file &&
        (file.type === "text/markdown" || file.name.endsWith(".md"))
      ) {
        setContentFile(file);
        const reader = new FileReader();
        reader.onload = (event) => {
          const text = event.target?.result as string;
          updateForm("content", text);
          setEditorContent(text);
        };
        reader.onerror = () => {
          updateForm("content", "");
          setContentFile(null);
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>
              خطا در خواندن فایل میباشد لطفاً یک فایل markdown (.md) انتخاب
              کنید.
            </AlertDescription>
          </Alert>;
        };
        reader.readAsText(file);
      } else {
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            خطا در خواندن فایل میباشد لطفاً یک فایل markdown (.md) انتخاب کنید.
          </AlertDescription>
        </Alert>;
        e.target.value = "";
        setContentFile(null);
      }
    },
    [setContentFile, updateForm]
  );

  const handleEditorChange = useCallback(
    (value: string) => {
      setEditorContent(value);
      updateForm("content", value);
    },
    [updateForm]
  );

  useEffect(() => {
    if (formState.content && !editorContent) {
      setEditorContent(formState.content);
    }
  }, [formState.content, updateForm, editorContent]);

  return (
    <InputSectionWrapper
      nextStepHandler={() => setStep(3)}
      prevStepHandler={() => setStep(1)}
      isNextDisabled={isStep2NextDisabled}
    >
      <div>
        <Heading as="h1" className="text-2xl font-bold mb-4">
          محتوای ایده‌ات
        </Heading>
        <div className="flex items-center gap-5 my-5">
          <p className="text-sm">
            با اضافه کردن محتوای ایده‌ات شما می‌توانید از طریق یک فایل markdown
            یا متن خود ایده‌ات را به سایت اضافه کنید.
          </p>

          <div className="relative bg-light dark:bg-primary-dark/80 rounded-full flex items-center px-2">
            <Button className="bg-transparent ">
              <span>اضافه کردن فایل Readme.md</span>
              <Input
                type="file"
                accept=".md,text/markdown"
                onChange={handleFileUpload}
                className="max-w-xs absolute top-0 right-0 bottom-0 opacity-0 cursor-pointer z-50"
              />
            </Button>
            {contentFile && formState.content.trim().length > 0 && (
              <div className="flex gap-2 mt-2 sm:mt-0">
                <Button
                  onClick={() => updateForm("isOpenContent", true)}
                  className="rounded-r-full rounded-l-2xl h-max py-1"
                >
                  خواندن محتوا
                </Button>
                <Button
                  onClick={handleEditContentFile}
                  className="rounded-l-full rounded-r-2xl  h-max py-1"
                >
                  نیاز به تغییرات داره
                </Button>
              </div>
            )}
            <IdeaContentFileModal
              setOpen={() => updateForm("isOpenContent", false)}
              isOpen={formState.isOpenContent}
              content={formState.content}
            />
          </div>
        </div>
      </div>
      <div className="mt-7 w-full bg-light/30 dark:bg-primary-dark/30 rounded-2xl p-8">
        <div ref={editorRef}>
          {contentLoading ? (
            <IsLoading />
          ) : (
            <Editor
              headerMode={false}
              bubbleMode={true}
              content={editorContent}
              onChange={handleEditorChange}
              placeholder="ایده خود را با جزئیات توضیح دهید..."
            />
          )}
        </div>
      </div>
    </InputSectionWrapper>
  );
};

export default StepTwo;
