import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight } from "lucide-react";

const bodyShapes = [
  { value: "slim", label: "لاغر" },
  { value: "athletic", label: "ورزشکاری" },
  { value: "average", label: "متوسط" },
  { value: "plus-size", label: "پلاس‌سایز" },
];

const genderOptions = [
  { value: "male", label: "مرد" },
  { value: "female", label: "زن" },
  { value: "non-binary", label: "غیر‌دودویی" },
  { value: "prefer-not", label: "ترجیح می‌دهم نگویم" },
];

const styleOptions = [
  { value: "minimal", label: "مینیمال", icon: "✨" },
  { value: "streetwear", label: "خیابانی", icon: "🔥" },
  { value: "formal", label: "رسمی", icon: "👔" },
  { value: "casual", label: "کژوال", icon: "😎" },
  { value: "sporty", label: "اسپرت", icon: "🏃" },
  { value: "luxury", label: "لاکچری", icon: "💎" },
  { value: "experimental", label: "تجربی", icon: "🎨" },
];

const goalOptions = [
  { value: "daily", label: "لباس روزانه", icon: "☀️" },
  { value: "party", label: "استایل مهمانی", icon: "🎉" },
  { value: "date", label: "شب قرار", icon: "💕" },
  { value: "fashion-show", label: "فشن شو", icon: "💃" },
  { value: "closet", label: "مدیریت کمد", icon: "👚" },
  { value: "ai-stylist", label: "استایلیست هوشمند", icon: "🤖" },
];

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    height: "",
    weight: "",
    age: "",
    bodyShape: "",
    gender: "",
    styles: [] as string[],
    goals: [] as string[],
  });

  const totalSteps = 3;
  const progress = ((step + 1) / totalSteps) * 100;

  const toggleArray = (key: "styles" | "goals", value: string) => {
    setData((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((v) => v !== value)
        : [...prev[key], value],
    }));
  };

  const handleFinish = () => {
    // TODO: save to database
    navigate("/app", { replace: true });
  };

  const canNext = () => {
    if (step === 0) return data.height && data.weight && data.bodyShape;
    if (step === 1) return data.gender && data.styles.length > 0;
    if (step === 2) return data.goals.length > 0;
    return false;
  };

  const slideVariants = {
    enter: { x: -30, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: 30, opacity: 0 },
  };

  return (
    <div className="fixed inset-0 flex flex-col bg-background">
      {/* Header */}
      <div className="px-4 pt-6 pb-2">
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => step > 0 && setStep(step - 1)}
            className={step === 0 ? "opacity-0 pointer-events-none" : ""}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
          <span className="text-sm text-muted-foreground">
            مرحله {step + 1} از {totalSteps}
          </span>
          <div className="w-10" />
        </div>
        <Progress value={progress} className="h-1.5 rounded-full" />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 pt-6 pb-24">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div key="step0" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
              <h2 className="text-xl font-bold mb-1">اطلاعات بدنی</h2>
              <p className="text-sm text-muted-foreground mb-6">برای پیشنهادات دقیق‌تر به ما بگو</p>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">قد (سانتی‌متر)</label>
                  <Input type="number" placeholder="مثلاً ۱۷۵" value={data.height} onChange={(e) => setData({ ...data, height: e.target.value })} className="text-left" dir="ltr" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">وزن (کیلوگرم)</label>
                  <Input type="number" placeholder="مثلاً ۷۰" value={data.weight} onChange={(e) => setData({ ...data, weight: e.target.value })} className="text-left" dir="ltr" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">سن (اختیاری)</label>
                  <Input type="number" placeholder="مثلاً ۲۵" value={data.age} onChange={(e) => setData({ ...data, age: e.target.value })} className="text-left" dir="ltr" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">فرم بدن</label>
                  <div className="grid grid-cols-2 gap-2">
                    {bodyShapes.map((shape) => (
                      <button
                        key={shape.value}
                        onClick={() => setData({ ...data, bodyShape: shape.value })}
                        className={`rounded-xl border px-4 py-3 text-sm font-medium transition-all ${
                          data.bodyShape === shape.value
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border bg-card text-card-foreground hover:border-primary/50"
                        }`}
                      >
                        {shape.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div key="step1" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
              <h2 className="text-xl font-bold mb-1">هویت و سبک</h2>
              <p className="text-sm text-muted-foreground mb-6">سبک مورد علاقه‌ات رو انتخاب کن</p>

              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">هویت جنسیتی</label>
                  <div className="grid grid-cols-2 gap-2">
                    {genderOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => setData({ ...data, gender: opt.value })}
                        className={`rounded-xl border px-4 py-3 text-sm font-medium transition-all ${
                          data.gender === opt.value
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border bg-card text-card-foreground hover:border-primary/50"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">سبک مورد علاقه (چند تا انتخاب کن)</label>
                  <div className="grid grid-cols-2 gap-2">
                    {styleOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => toggleArray("styles", opt.value)}
                        className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-all ${
                          data.styles.includes(opt.value)
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border bg-card text-card-foreground hover:border-primary/50"
                        }`}
                      >
                        <span>{opt.icon}</span>
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
              <h2 className="text-xl font-bold mb-1">اهداف</h2>
              <p className="text-sm text-muted-foreground mb-6">می‌خوای در چه زمینه‌هایی کمکت کنم؟</p>

              <div className="grid grid-cols-2 gap-3">
                {goalOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => toggleArray("goals", opt.value)}
                    className={`flex flex-col items-center gap-2 rounded-2xl border px-4 py-5 text-sm font-medium transition-all ${
                      data.goals.includes(opt.value)
                        ? "border-primary bg-primary/10 text-primary shadow-glow"
                        : "border-border bg-card text-card-foreground hover:border-primary/50"
                    }`}
                  >
                    <span className="text-2xl">{opt.icon}</span>
                    {opt.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 inset-x-0 p-4 bg-background/80 backdrop-blur-lg border-t border-border">
        <Button
          onClick={() => (step < totalSteps - 1 ? setStep(step + 1) : handleFinish())}
          disabled={!canNext()}
          className="w-full rounded-xl py-6 text-base font-semibold gradient-primary text-primary-foreground shadow-glow disabled:opacity-40"
        >
          {step < totalSteps - 1 ? (
            <span className="flex items-center gap-2">
              بعدی
              <ChevronLeft className="h-4 w-4" />
            </span>
          ) : (
            "شروع کنیم! 🚀"
          )}
        </Button>
      </div>
    </div>
  );
};

export default Onboarding;
