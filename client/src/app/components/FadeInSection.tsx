import React, { useEffect, useRef, useState, ReactNode } from "react";

interface FadeInSectionProps {
  children: ReactNode;
  className?: string;
  options: "fade-in-scale" | "fade-in-section";
}

const FadeInSection: React.FC<FadeInSectionProps> = ({
  children,
  className,
  options,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    });

    observer.observe(section);

    return () => {
      observer.unobserve(section);
    };
  }, []);

  return (
    <div
      className={`${className ? className : ""} ${options} ${
        isVisible ? "active" : ""
      }  `}
      ref={sectionRef}
    >
      {children}
    </div>
  );
};

export default FadeInSection;
