import React, { useEffect } from "react";
import { Link } from 'react-router-dom'
import {
  BookOpen,
  Laptop,
  GraduationCap
} from "lucide-react";
import gsap from 'gsap';

const HeroSection = () => {

  useEffect(() => {

    gsap.killTweensOf([
      ".hero-badge",
      ".hero-title span",
      ".hero-description",
      ".hero-actions",
      ".hero-illustration",
      ".dot1",
      ".dot2",
      ".ring1",
      ".ring2",
      ".sparkle1"
    ]);

    const tl = gsap.timeline({
      defaults: {
        ease: "power3.out"
      }
    });

    tl.fromTo(
      ".hero-badge",
      {
        autoAlpha: 0,
        y: 20
      },
      {
        autoAlpha: 1,
        y: 0,
        duration: .45
      }
    )

      .fromTo(
        ".hero-title span",
        {
          autoAlpha: 0,
          y: 45
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: .7,
          stagger: .12
        },
        "-=.15"
      )

      .fromTo(
        ".hero-description",
        {
          autoAlpha: 0,
          y: 25
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: .5
        },
        "-=.35"
      )

      .fromTo(
        ".hero-actions",
        {
          autoAlpha: 0,
          y: 20
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: .45
        },
        "-=.3"
      )

      .fromTo(
        ".hero-illustration",
        {
          autoAlpha: 0,
          x: 50,
          scale: .92,
          rotate: 2
        },
        {
          autoAlpha: 1,
          x: 0,
          scale: 1,
          rotate: 0,
          duration: .85
        },
        "-=.45"
      );

    gsap.to(".dot1", {
      y: -10,
      duration: 2.8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    gsap.to(".dot2", {
      y: 10,
      duration: 3.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    gsap.to(".ring1", {
      rotate: 8,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    gsap.to(".ring2", {
      rotate: -8,
      duration: 4.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    gsap.to(".sparkle1", {
      scale: 1.15,
      opacity: .6,
      duration: 1.8,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });

  }, []);

  return (
    <section className="hero">

      <div className="container">

        <div className="hero-left">

          <span className="hero-badge">
            Learn • Build • Teach
          </span>

          <h1 className="hero-title">
            <span>Build Skills.</span>
            <br />
            <span>Share Knowledge.</span>
            <br />
            <span className="color">Grow Together.</span>
          </h1>

          <p className="hero-description">
            Master practical skills through structured online courses or
            become an instructor and share your knowledge with learners
            across the globe.
          </p>

          <div className="hero-actions">

            <Link
              to="/browsecourses"
              className="btn-primary-col"
            >
              Browse Courses
            </Link>

            <Link
              to="/teacherregister"
              className="btn-secondary-col"
            >
              Become an Instructor
            </Link>

          </div>

        </div>

        <div className="hero-right">

          <span className="hero-decoration dot dot1"></span>
          <span className="hero-decoration dot dot2"></span>

          <span className="hero-decoration ring ring1"></span>
          <span className="hero-decoration ring ring2"></span>

          <span className="hero-decoration sparkle sparkle1"></span>

          <div className="hero-illustration">
            <img
              src="./images/hero-illustration.png"
              alt="Online Learning"
            />
          </div>

        </div>

      </div>

    </section >
  )
}

export default HeroSection;