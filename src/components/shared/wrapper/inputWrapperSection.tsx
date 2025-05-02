import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "../../ui/button";

interface InputSectionWrapperProps {
  children: React.ReactNode;
  prevStepHandler: () => void;
  nextStepHandler: () => void;
  isPrevDisabled?: boolean;
  isNextDisabled?: boolean;
  className?: string;
}

const InputSectionWrapper: React.FC<InputSectionWrapperProps> = ({
  children,
  prevStepHandler,
  nextStepHandler,
  isPrevDisabled = false,
  isNextDisabled = false,
  className,
}) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5 }}
    className={`w-full mb-10 lg:mb-0 p-2 text-primary dark:text-light ${className}`}
  >
    {children}
    <div className="flex justify-between mt-16 mb-10">
      {!isPrevDisabled && (
        <Button
          className="flex items-center gap-2 dark:bg-primary bg-light"
          onClick={prevStepHandler}
        >
          <ArrowRight />
          <span className="text-lg">قبلی</span>
        </Button>
      )}
      {!isNextDisabled && (
        <Button
          className="flex items-center gap-2 dark:bg-primary bg-light"
          onClick={nextStepHandler}
          disabled={isNextDisabled}
        >
          <span className="text-lg">بعدی</span>
          <ArrowLeft />
        </Button>
      )}
    </div>
  </motion.div>
);

export default InputSectionWrapper;
