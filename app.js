const FierceWoolArt = () => {
  // State for mobile menu
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  
  // Commission types data
  const commissionTypes = [
    {
      title: "Headshot",
      price: "$30",
      image: "https://via.placeholder.com/400x400",
    },
    {
      title: "Half Body",
      price: "$50",
      image: "https://via.placeholder.com/400x400",
      popular: true,
    },
    {
      title: "Full Body",
      price: "$80",
      image: "https://via.placeholder.com/400x400",
    },
    {
      title: "Additional Characters",
      price: "+$20",
      image: "https://via.placeholder.com/400x400",
    },
    {
      title: "Pixel Art Icon",
      price: "$25",
      image: "https://via.placeholder.com/400x400",
    },
    {
      title: "Reference Sheet",
      price: "$100",
      image: "https://via.placeholder.com/400x400",
    },
    {
      title: "Traditional Package",
      price: "$150",
      image: "https://via.placeholder.com/400x400",
    }
  ];
  
  // FAQ data
  const faqItems = [
    {
      question: "What is the turnaround time for commissions?",
      answer: "Typically 1-2 weeks depending on complexity and my current queue."
    },
    {
      question: "Do you offer revisions?",
      answer: "Yes! Each commission includes up to 2 rounds of revisions."
    },
    {
      question: "What kind of characters do you specialize in?",
      answer: "I specialize in creating alternate versions of existing characters."
    }
  ];
  
  // State for FAQs
  const [openFAQ, setOpenFAQ] = React.useState(null);
  
  // Toggle FAQ
  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };
};
