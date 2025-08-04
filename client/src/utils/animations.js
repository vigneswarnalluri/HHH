export const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.98
  },
  in: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 20,
      mass: 0.5
    }
  },
  out: {
    opacity: 0,
    y: -20,
    scale: 0.98,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 20,
      mass: 0.5
    }
  }
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1]
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

export const slideUp = {
  initial: { y: 50, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 15
    }
  },
  exit: {
    y: -50,
    opacity: 0,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 15
    }
  }
};

export const scaleUp = {
  initial: { scale: 0.9, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 10
    }
  },
  exit: {
    scale: 0.9,
    opacity: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 10
    }
  }
};

export const rotateIn = {
  initial: { rotate: -5, opacity: 0 },
  animate: {
    rotate: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 80,
      damping: 10
    }
  },
  exit: {
    rotate: 5,
    opacity: 0,
    transition: {
      type: 'spring',
      stiffness: 80,
      damping: 10
    }
  }
};