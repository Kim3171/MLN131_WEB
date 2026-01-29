import { useState, useEffect, useRef } from 'react'
import './App.css'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Star, Users, Globe, Heart, BookOpen, Award, ArrowRight, ChevronDown, Sun, Moon, RefreshCw } from 'lucide-react'


function App() {
    const [currentQuiz, setCurrentQuiz] = useState(0)
    const [selectedAnswer, setSelectedAnswer] = useState(null)
    const [showAnswer, setShowAnswer] = useState(false)
    // new UI states
    const [scrollProgress, setScrollProgress] = useState(0)
    const [showBackTop, setShowBackTop] = useState(false)
    const [darkMode, setDarkMode] = useState(false)
    const [reducedMotion, setReducedMotion] = useState(false)
    const [activeSection, setActiveSection] = useState('hero')
    // video handling
    const videoRef = useRef(null)
    const [videoCanPlay, setVideoCanPlay] = useState(false)
    const [videoFailed, setVideoFailed] = useState(false)
    // timeline background video
    const timelineVideoRef = useRef(null)
    const [timelineVideoCanPlay, setTimelineVideoCanPlay] = useState(false)
    const [timelineVideoFailed, setTimelineVideoFailed] = useState(false)
    // active sub-topic inside international section
    const [activeIntlTopic, setActiveIntlTopic] = useState('intl-role')
    // Intro overlay state
    const [showIntro, setShowIntro] = useState(false)
    const [showAnswerModal, setShowAnswerModal] = useState(false)
    const introHeadingRef = useRef(null)
    const lastFocusedRef = useRef(null)
    // debug overlay for intl section
    const [intlDebug, setIntlDebug] = useState(false)

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    // Navigation items (label -> target id)
    const navItems = [
        { id: 'hero', label: 'Trang chủ' },
        { id: 'timeline', label: 'Hành trình' },
        { id: 'quan-diem-chinh-sach', label: 'Quan điểm & Chính sách' },
        { id: 'gia-tri-thuc-tien', label: 'Giá trị thực tiễn' },
        { id: 'video-giang-giai', label: 'Video giải thích' },
        { id: 'cau-hoi-suy-ngam', label: 'Câu hỏi suy ngẫm' },
        { id: 'quiz', label: 'Quiz' },
        { id: 'tinh-minh-bach-ai', label: 'Tính minh bạch AI' }
    ]

    // Function to scroll to next section
    const scrollToNextSection = (currentSectionId) => {
        const currentIndex = navItems.findIndex(item => item.id === currentSectionId)
        if (currentIndex !== -1 && currentIndex < navItems.length - 1) {
            const nextSection = navItems[currentIndex + 1]
            const element = document.getElementById(nextSection.id)
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }
        }
    }

    // Function to scroll to top
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const quizQuestions = [
        {
            question: 'Theo quan điểm duy vật lịch sử, vì sao tôn giáo tồn tại lâu dài trong thời kỳ quá độ lên CNXH?',
            options: [
                'Vì đa số người dân vẫn có nhu cầu tín ngưỡng.',
                'Vì Nhà nước chưa có biện pháp hữu hiệu để xóa bỏ.',
                'Vì những nguyên nhân kinh tế-xã hội sinh ra tôn giáo chưa được khắc phục triệt để.',
                'Vì tôn giáo là nhu cầu tinh thần vĩnh viễn của con người.'
            ],
            correct: 2,
            explanation: 'Quan điểm duy vật lịch sử chỉ ra: tôn giáo phát sinh từ những điều kiện vật chất-xã hội cụ thể (nghèo đói, bất công, hạn chế nhận thức...). Trong thời kỳ quá độ, nhiều điều kiện này vẫn tồn tại, nên tôn giáo còn cơ sở tồn tại.'
        },
        {
            question: 'Việc Luật Tín ngưỡng, Tôn giáo 2016 "phân biệt hoạt động tôn giáo hợp pháp và việc lợi dụng tôn giáo" thể hiện cách tiếp cận nào?',
            options: [
                'Tiếp cận dựa trên tính hai mặt của tôn giáo.',
                'Tiếp cận dựa trên quyền tự do tuyệt đối.',
                'Tiếp cận dựa trên ưu tiên kiểm soát.',
                'Tiếp cận dựa trên đối lập giữa tôn giáo và nhà nước.'
            ],
            correct: 0,
            explanation: 'Cách tiếp cận này nhìn nhận: tôn giáo có mặt tích cực (hoạt động hợp pháp, mang giá trị đạo đức) và mặt tiêu cực (bị lợi dụng cho mục đích xấu). Chính sách cần phân biệt để phát huy mặt tích cực, hạn chế mặt tiêu cực.'
        },
        {
            question: 'Nguyên tắc "phát huy giá trị văn hóa, đạo đức tốt đẹp của tôn giáo" phản ánh điều gì trong vận dụng lý luận Mác-Lênin?',
            options: [
                'Sự từ bỏ lý luận cơ bản về tôn giáo.',
                'Sự vận dụng linh hoạt, phù hợp điều kiện cụ thể.',
                'Sự nhượng bộ trước sức mạnh của tôn giáo.',
                'Sự thay đổi hoàn toàn quan điểm về tôn giáo.'
            ],
            correct: 1,
            explanation: 'Đây không phải từ bỏ lý luận, mà là vận dụng nó một cách biện chứng: thừa nhận trong tôn giáo có những yếu tố tích cực có thể khai thác cho mục đích xã hội, phù hợp với nguyên tắc lịch sử-cụ thể.'
        },
        {
            question: 'Trong bối cảnh toàn cầu hóa, việc phát huy giá trị tôn giáo ở Việt Nam có thể góp phần gì?',
            options: [
                'Thay thế vai trò của hệ tư tưởng chính thống.',
                'Xây dựng nền văn hóa giàu bản sắc.',
                'Giảm bớt sự quản lý của Nhà nước.',
                'Tạo ra xã hội đa nguyên về tư tưởng.'
            ],
            correct: 1,
            explanation: 'Nhiều giá trị tôn giáo gắn với truyền thống văn hóa dân tộc. Khi được phát huy một cách phù hợp, chúng góp phần làm phong phú bản sắc văn hóa Việt Nam, tạo nền tảng tinh thần vững chắc trong hội nhập.'
        },
        {
            question: 'Quan điểm "đoàn kết giữa đồng bào có đạo và không có đạo" dựa trên cơ sở nào?',
            options: [
                'Sự thừa nhận ưu thế của tôn giáo.',
                'Truyền thống đoàn kết dân tộc và nhu cầu phát triển chung.',
                'Áp lực từ các tổ chức tôn giáo.',
                'Yêu cầu của các tổ chức quốc tế.'
            ],
            correct: 1,
            explanation: 'Truyền thống đoàn kết là một đặc điểm nổi bật của dân tộc Việt Nam. Trong điều kiện xây dựng và phát triển đất nước, sự đoàn kết toàn dân - bao gồm cả đồng bào theo các tôn giáo - trở thành nguồn lực quan trọng.'
        }
    ]


    // 2. State (at the top of your component)
    const [score, setScore] = useState(0);


    // 3. Scroll function
    const scrollToSection = (sectionId) => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    }

    // 4. KEEP THIS handleQuizAnswer (with score)
    const handleQuizAnswer = (index) => {
        setSelectedAnswer(index);
        setShowAnswer(true);

        // Check if answer is correct and update score
        if (index === quizQuestions[currentQuiz].correct) {
            setScore(prevScore => prevScore + 1);
        }
    };

    // 5. KEEP THIS nextQuestion
    const nextQuestion = () => {
        if (currentQuiz < quizQuestions.length - 1) {
            setCurrentQuiz(currentQuiz + 1);
            setSelectedAnswer(null);
            setShowAnswer(false);
        }
    };

    // Init mode preferences & reduced motion
    useEffect(() => {
        const stored = localStorage.getItem('theme-dark')
        if (stored === 'true') setDarkMode(true)
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
        const applyRM = () => setReducedMotion(mq.matches)
        applyRM()
        mq.addEventListener('change', applyRM)
        return () => mq.removeEventListener('change', applyRM)
    }, [])

    const toggleDarkMode = () => {
        setDarkMode(d => {
            const v = !d
            localStorage.setItem('theme-dark', String(v))
            return v
        })
    }

    // Reveal on scroll
    useEffect(() => {
        document.documentElement.classList.add('js')
        const els = document.querySelectorAll('[data-reveal]')
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        e.target.classList.add('is-visible')
                        io.unobserve(e.target)
                    }
                })
            },
            { threshold: 0.15 }
        )
        els.forEach((el) => io.observe(el))
        return () => io.disconnect()
    }, [])

    // Tilt effect for hero card
    useEffect(() => {
        if (reducedMotion) return
        const card = document.querySelector('.tilt-card')
        if (!card) return
        const handle = (e) => {
            const r = card.getBoundingClientRect()
            const x = e.clientX - r.left
            const y = e.clientY - r.top
            const rx = ((y / r.height) - 0.5) * -12
            const ry = ((x / r.width) - 0.5) * 14
            card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`
        }
        const reset = () => (card.style.transform = 'rotateX(0deg) rotateY(0deg)')
        card.addEventListener('mousemove', handle)
        card.addEventListener('mouseleave', reset)
        return () => {
            card.removeEventListener('mousemove', handle)
            card.removeEventListener('mouseleave', reset)
        }
    }, [reducedMotion])

    // Observe international solidarity sub-blocks to highlight in local TOC
    useEffect(() => {
        const targets = document.querySelectorAll('#gia-tri-thuc-tien [data-intl-topic]')
        if (!targets.length) return
        const io = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    setActiveIntlTopic(e.target.getAttribute('data-intl-topic'))
                }
            })
        }, { rootMargin: '-40% 0px -40% 0px', threshold: 0 })
        targets.forEach(t => io.observe(t))
        return () => io.disconnect()
    }, [])

    // Unified scroll handler (progress + parallax + active section)
    useEffect(() => {
        let ticking = false
        const sectionIds = navItems.map(n => n.id)
        const onScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const y = window.scrollY || window.pageYOffset
                    const docHeight = document.documentElement.scrollHeight - window.innerHeight
                    const prog = docHeight > 0 ? y / docHeight : 0
                    setScrollProgress(prog)
                    setShowBackTop(y > 600)
                    // Active section detection
                    let current = 'hero'
                    for (const id of sectionIds) {
                        const sec = document.getElementById(id)
                        if (!sec) continue
                        const top = sec.getBoundingClientRect().top + window.scrollY - 140 // offset for fixed nav
                        if (y >= top) current = id
                    }
                    setActiveSection(current)
                    ticking = false
                })
                ticking = true
            }
        }
        window.addEventListener('scroll', onScroll, { passive: true })
        onScroll()
        return () => window.removeEventListener('scroll', onScroll)
    }, [reducedMotion, navItems])

    // Lazy load and autoplay timeline background video when timeline section visible
    useEffect(() => {
        if (reducedMotion) return
        const section = document.getElementById('timeline')
        if (!section) return
        const v = timelineVideoRef.current
        if (!v) return
        let loaded = false
        const io = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting && !loaded) {
                    loaded = true
                    // trigger load
                    v.load()
                    const playAttempt = v.play()
                    if (playAttempt && typeof playAttempt.then === 'function') {
                        playAttempt.catch(() => {/* ignore */ })
                    }
                    io.unobserve(section)
                }
            })
        }, { threshold: 0.25 })
        io.observe(section)
        return () => io.disconnect()
    }, [reducedMotion])

    // Lazy play hero video when in view (moved inside component)
    useEffect(() => {
        if (reducedMotion) return
        const vid = videoRef.current
        if (!vid) return
        let played = false
        const io = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting && !played) {
                    played = true
                    const p = vid.play()
                    if (p && typeof p.then === 'function') {
                        p.catch(() => {
                            setVideoFailed(true)
                        })
                    }
                    io.disconnect()
                }
            })
        }, { threshold: 0.25 })
        io.observe(vid)
        return () => io.disconnect()
    }, [reducedMotion])

    // Ensure video plays (no toggle now)
    useEffect(() => {
        if (reducedMotion || videoFailed) return
        const vid = videoRef.current
        if (!vid) return
        const p = vid.play()
        if (p && typeof p.then === 'function') p.catch(() => { })
    }, [reducedMotion, videoFailed])

    // Close intro overlay helper
    const closeIntro = () => {
        setShowIntro(false)
        const prev = lastFocusedRef.current
        if (prev && typeof prev.focus === 'function') prev.focus()
    }

    // Keyboard handling for dialog
    useEffect(() => {
        if (!showIntro) return
        const keyHandler = (e) => {
            if (e.key === 'Escape') {
                e.preventDefault(); closeIntro()
            }
        }
        window.addEventListener('keydown', keyHandler)
        // focus heading
        setTimeout(() => introHeadingRef.current?.focus(), 30)
        return () => window.removeEventListener('keydown', keyHandler)
    }, [showIntro])

    // Key listener to toggle international layout debug (Shift + D)
    useEffect(() => {
        const kb = (e) => {
            if (e.key.toLowerCase() === 'd' && e.shiftKey) {
                setIntlDebug(d => !d)
            }
        }
        window.addEventListener('keydown', kb)
        return () => window.removeEventListener('keydown', kb)
    }, [])

    return (
        <div className={`${darkMode ? 'theme-dark' : ''} ${reducedMotion ? 'reduced-motion' : ''}`}>
            {/* Scroll progress bar */}
            <div id="scroll-progress" style={{ transform: `scaleX(${scrollProgress})` }} aria-hidden="true" />

            <div className={`min-h-screen bg-gradient-to-br from-red-600 via-red-700 to-red-800 relative transition-colors duration-500 ${darkMode ? 'dark-surface' : ''}`}>
                <div className="particle-layer">
                    <span className="p" />
                    <span className="p" />
                    <span className="p" />
                    <span className="p" />
                    <span className="p" />
                </div>

                {/* Nav */}
                <nav className={`fixed top-0 w-full z-50 bg-gradient-to-r from-red-800 to-red-900 border-b border-yellow-400/30 shadow-lg ${darkMode ? 'from-red-900 to-red-950' : ''}`}>
                    <div className="container mx-auto px-4">
                        <div className="flex items-center justify-between h-16">
                            {/* Logo bên trái */}
                            <button
                                onClick={() => window.location.reload()}
                                className="flex items-center gap-2 text-yellow-300 hover:text-yellow-400 transition-colors"
                                aria-label="Tải lại trang"
                            >
                                <div className="font-bold text-xl tracking-tight bg-gradient-to-r from-yellow-300 to-yellow-400 bg-clip-text text-transparent">
                                    MLN131
                                </div>
                                <div className="h-6 w-px bg-yellow-400/50"></div>
                                <div className="text-sm font-semibold text-yellow-200">AI1807</div>
                            </button>

                            {/* Menu giữa */}
                            <div className="flex-1 max-w-3xl mx-8">
                                <ul className="flex items-center justify-center space-x-1">
                                    {navItems.map(item => {
                                        const shortLabel = item.label.includes('Quan điểm & Chính sách') ? 'Quan điểm & CS' :
                                            item.label.includes('Giá trị thực tiễn') ? 'Giá trị thực tiễn' :
                                                item.label.includes('Câu hỏi suy ngẫm') ? 'Câu hỏi suy ngẫm' :
                                                    item.label.includes('Tính minh bạch AI') ? 'Minh bạch AI' :
                                                        item.label;

                                        return (
                                            <li key={item.id} className="relative">
                                                <button
                                                    className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 flex items-center gap-1 ${activeSection === item.id
                                                        ? 'bg-yellow-400 text-black font-bold shadow-md'
                                                        : 'text-yellow-200 hover:bg-yellow-400/20 hover:text-yellow-300'}`}
                                                    onClick={() => scrollToSection(item.id)}
                                                    aria-current={activeSection === item.id ? 'page' : undefined}
                                                    title={item.label}
                                                >
                                                    {shortLabel}
                                                    {activeSection === item.id && (
                                                        <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-red-500 rounded-full"></span>
                                                    )}
                                                </button>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>

                            {/* Bên phải */}
                            <div className="flex items-center gap-4">
                                <button
                                    aria-label="Chuyển chế độ sáng/tối"
                                    className="p-2 rounded-full bg-yellow-400/10 hover:bg-yellow-400/20 text-yellow-300 transition-colors"
                                    onClick={toggleDarkMode}
                                >
                                    {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                                </button>
                                <div className="hidden md:block px-4 py-2 bg-gradient-to-r from-yellow-500/20 to-yellow-400/20 border border-yellow-400/40 rounded-full text-yellow-300 text-sm font-bold tracking-wide">
                                    NHÓM 5
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Hero with background video only */}
                <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
                    {!reducedMotion && (
                        <div className="hero-bg-video-wrapper" aria-hidden="true">
                            <video
                                ref={videoRef}
                                className={`hero-bg-video ${videoCanPlay ? 'is-visible' : 'is-loading'}`}
                                loop
                                muted
                                playsInline
                                preload="none"
                                poster="/flag-poster.jpg"
                                onCanPlay={() => setVideoCanPlay(true)}
                                onError={() => setVideoFailed(true)}
                            >
                                <source src="/flag.mp4" type="video/mp4" />
                            </video>
                            <div className="hero-bg-overlay" />
                        </div>
                    )}
                    <div className="container mx-auto px-6 xl:px-20 py-28 lg:py-32 relative z-10 w-full max-w-[1600px]">
                        <div className="hero-layout-final">
                            <div className="hero-text-block hero-text-block-final" data-reveal>
                                <h1 className="hero-heading-compact" aria-label="SỐNG TỐT ĐỜI, ĐẸP ĐẠO">
                                    SỐNG TỐT ĐỜI, ĐẸP ĐẠO
                                </h1>
                                <p className="hero-desc-compact" data-reveal>
                                    Tôn giáo trong thời kỳ quá độ lên chủ nghĩa xã hội ở Việt Nam
                                </p>
                                <div className="hero-actions" data-reveal>
                                    <Button size="lg" className="cta-primary" onClick={() => { lastFocusedRef.current = document.activeElement; setShowIntro(true) }}>
                                        <BookOpen className="h-5 w-5" /> KHÁM PHÁ NỘI DUNG
                                    </Button>
                                    <Button size="lg" variant="outline" className="cta-secondary" onClick={() => scrollToSection('timeline')}>
                                        <ArrowRight className="h-5 w-5 icon-shift" /> XEM HÀNH TRÌNH
                                    </Button>
                                </div>
                            </div>
                            <div className="flex justify-center lg:justify-start" data-reveal>
                                <div className="chapter5-single-frame" aria-label="Chương 6: Tôn giáo trong thời kỳ quá độ lên CNXH ở Việt Nam">
                                    <img
                                        src="/1.png"
                                        alt="Chương 6: Tôn giáo trong thời kỳ quá độ lên CNXH ở Việt Nam"
                                        className="chapter5-image"
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce" aria-hidden="true">
                        <button
                            onClick={() => scrollToNextSection('hero')}
                            className="text-yellow-300 hover:text-yellow-400 transition-colors duration-300 hover:scale-110 transform"
                            aria-label="Chuyển đến section tiếp theo"
                        >
                            <ChevronDown className="w-8 h-8" />
                        </button>
                    </div>
                </section>
                {showIntro && (
                    <div className="intro-overlay" role="dialog" aria-modal="true" aria-labelledby="intro-heading" aria-describedby="intro-body">
                        <div className="intro-dialog">
                            <h3 id="intro-heading" ref={introHeadingRef} tabIndex={-1} className="intro-title">TỔNG QUAN</h3>
                            <div id="intro-body" className="intro-content">
                                <p>Chủ nghĩa Mác-Lênin phân tích tôn giáo như một <strong>hiện tượng xã hội có tính lịch sử</strong>, sẽ tồn tại lâu dài trong thời kỳ quá độ. Ở Việt Nam, quan điểm này được vận dụng với tinh thần <strong>biện chứng và thực tiễn</strong>: không phủ nhận tôn giáo, mà tìm cách phát huy những giá trị tích cực của nó phục vụ sự phát triển chung. Từ cơ sở lý luận đến chính sách cụ thể, mối quan hệ giữa Nhà nước và tôn giáo đang được xây dựng trên nguyên tắc <strong>tôn trọng, đoàn kết và đồng hành</strong>.</p>
                            </div>
                            <div className="intro-actions">
                                <Button size="sm" variant="outline" className="cta-secondary" onClick={closeIntro}>Đóng</Button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Timeline */}
                <section id="timeline" className="py-12 md:py-16 relative overflow-hidden timeline-section" data-reveal>
                    {/* Background video */}
                    {!reducedMotion && (
                        <div className={`timeline-video-wrapper ${timelineVideoCanPlay ? 'is-visible' : 'is-loading'}`} aria-hidden="true">
                            <video
                                ref={timelineVideoRef}
                                className="timeline-bg-video"
                                loop
                                muted
                                playsInline
                                preload="none"
                                poster="/flag-poster.jpg"
                                onCanPlay={() => setTimelineVideoCanPlay(true)}
                                onError={() => setTimelineVideoFailed(true)}
                            >
                                <source src="/hanh_trinh.mp4" type="video/mp4" />
                            </video>
                            <div className="timeline-video-overlay" />
                        </div>
                    )}
                    <div className="container mx-auto px-4 relative z-10">
                        <h2 className="text-4xl font-bold text-center text-yellow-300 mb-16">HÀNH TRÌNH CHÍNH SÁCH TÔN GIÁO</h2>
                        <div className="relative">
                            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-yellow-400" />
                            <div className="space-y-6 md:space-y-10">
                                {[
                                    { year: '1946', event: 'Hiến pháp đầu tiên', description: 'Ghi nhận quyền tự do tín ngưỡng như một quyền cơ bản. Thể hiện tư tưởng đoàn kết toàn dân ngay từ buổi đầu xây dựng nhà nước.' },
                                    { year: '1990', event: 'Nghị quyết 24 của Bộ Chính trị', description: 'Đánh dấu bước chuyển trong nhận thức: từ nhấn mạnh mặt tiêu cực sang thấy cả tiềm năng tích cực của tôn giáo trong xã hội mới.' },
                                    { year: '2004', event: 'Pháp lệnh Tín ngưỡng, Tôn giáo', description: 'Chuyển dần từ quản lý hành chính sang quản lý bằng pháp luật. Tạo khung pháp lý cơ bản cho hoạt động tôn giáo hợp pháp.' },
                                    { year: '2016', event: 'Luật Tín ngưỡng, Tôn giáo', description: 'Hoàn thiện hệ thống pháp luật, thể hiện cách tiếp cận toàn diện: vừa bảo đảm quyền tự do, vừa định hướng phát triển lành mạnh.' },
                                    { year: 'Hiện nay', event: 'Đồng hành cùng phát triển', description: 'Các tổ chức tôn giáo tham gia ngày càng tích cực vào đời sống xã hội, chứng minh khả năng hài hòa giữa đức tin và trách nhiệm công dân.' }
                                ].map((item, index) => (
                                    <div key={index} className={`flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                                        <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-6 md:pr-8' : 'text-left pl-6 md:pl-8'}`}>
                                            <Card className="bg-yellow-50 border-yellow-400 shadow-lg hover:shadow-xl transition-shadow timeline-card compact">
                                                <CardHeader className="py-3 px-4 pb-2">
                                                    <CardTitle className="text-red-800 text-lg md:text-xl leading-tight">{item.year}</CardTitle>
                                                    <CardDescription className="text-red-700 font-semibold text-sm md:text-base leading-snug">{item.event}</CardDescription>
                                                </CardHeader>
                                                <CardContent className="pt-0 pb-3 px-4">
                                                    <p className="text-red-600 text-sm md:text-[15px] leading-snug">{item.description}</p>
                                                </CardContent>
                                            </Card>
                                        </div>
                                        <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-yellow-400 rounded-full border-4 border-red-800" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Nút mũi tên xuống ở giữa bên phải */}
                        <div className="absolute bottom-4 right-8 animate-bounce">
                            <button
                                onClick={() => scrollToNextSection('timeline')}
                                className="text-yellow-300 hover:text-yellow-400 transition-colors duration-300 hover:scale-110 transform"
                                aria-label="Chuyển đến section tiếp theo"
                            >
                                <ChevronDown className="w-8 h-8" />
                            </button>
                        </div>

                    </div>
                </section>

                {/* Quan điểm & Chính sách */}
                <section id="quan-diem-chinh-sach" className="min-h-screen bg-gradient-to-br from-red-700 via-red-800 to-red-900 relative overflow-hidden flex items-center">
                    {/* Video nền */}
                    <video
                        className="absolute inset-0 w-full h-full object-cover opacity-15"
                        autoPlay
                        muted
                        loop
                        playsInline
                    >
                        <source src="/5.1.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>

                    {/* Overlay để làm sẫm video */}
                    <div className="absolute inset-0 bg-black bg-opacity-50 z-5"></div>

                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-20 z-10">
                        <div className="absolute inset-0 bg-repeat opacity-30" style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffd770' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                        }}></div>
                    </div>

                    <div className="relative z-20 container mx-auto px-4 sm:px-6 md:px-8 py-8 md:py-16">
                        {/* Tiêu đề chính - Adjusted spacing for mobile */}
                        <div className="text-center mb-8 md:mb-16 px-2">
                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-yellow-400 mb-4 md:mb-6 tracking-wide">
                                QUAN ĐIỂM & CHÍNH SÁCH VỀ TÔN GIÁO
                            </h1>
                            <div className="w-24 md:w-32 h-1 bg-yellow-400 mx-auto mt-4 md:mt-6"></div>
                        </div>

                        {/* Content Layout - Responsive adjustments */}
                        <div className="relative max-w-6xl mx-auto min-h-[300px] md:min-h-[650px] px-2 md:px-6 mt-2 md:mt-4">

                            {/* Desktop layout (hidden on mobile) */}
                            <div className="hidden md:block">
                                {/* CƠ SỞ LÝ LUẬN */}
                                <div className="absolute top-20 left-[-60px]">
                                    <div className="flex items-center gap-10 mb-20">
                                        <div className="w-[360px]">
                                            <h3 className="text-4xl font-bold text-yellow-400 mb-6" style={{ textAlign: 'right' }}>CƠ SỞ LÝ LUẬN TỪ CNXH KHOA HỌC</h3>
                                            <p className="text-white text-base leading-8" style={{ textAlign: 'right', lineHeight: '1.6' }}>
                                                Tôn giáo là hình thái ý thức xã hội có tính lịch sử, phát sinh từ những điều kiện kinh tế-xã hội cụ thể. Nó tồn tại lâu dài vì những nguyên nhân sinh ra nó chưa thể khắc phục ngay trong thời kỳ quá độ.
                                            </p>
                                        </div>
                                        <div className="w-48 h-48 rounded-full overflow-hidden shadow-xl border-4 border-yellow-400 hover:scale-105 transition-all duration-300 flex-shrink-0 animate-float">
                                            <img src="/5.1.1.png" alt="Cơ sở lý luận" className="w-full h-full object-cover scale-125" />
                                        </div>
                                    </div>
                                </div>

                                {/* TÍNH HAI MẶT */}
                                <div className="absolute top-[60px] left-1/2 translate-x-[60px]">
                                    <div className="flex items-center gap-10 mb-20">
                                        {/* Image */}
                                        <div className="w-56 h-56 rounded-full overflow-hidden shadow-xl border-[3px] border-yellow-400 hover:scale-105 transition-all duration-300 flex-shrink-0 animate-float-delay">
                                            <img
                                                src="/5.1.2.png"
                                                alt="Tính hai mặt"
                                                className="w-full h-full object-cover scale-110"
                                            />
                                        </div>

                                        {/* Text */}
                                        <div className="w-[380px] text-left">
                                            <h3 className="text-4xl font-bold text-yellow-400 mb-6">
                                                TÍNH HAI MẶT
                                            </h3>
                                            <p className="text-white text-base leading-7">
                                                Tôn giáo mang hai mặt đối lập thống nhất: mặt tích cực (giá trị đạo đức, văn hóa) và mặt tiêu cực (có thể trở thành công cụ mê hoặc, cản trở nhận thức khoa học). Chính sách cần dựa trên sự nhìn nhận toàn diện này.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* TIẾP CẬN BẰNG GIÁO DỤC */}
                                <div className="absolute top-[380px] left-[-150px]">
                                    <div className="flex items-center gap-14 mb-20">
                                        <div className="w-[420px]">
                                            <h3 className="text-3xl font-bold text-yellow-400 mb-6" style={{ textAlign: 'right' }}>TIẾP CẬN BẰNG GIÁO DỤC</h3>
                                            <div className="text-white text-base leading-7 space-y-3" style={{ textAlign: 'right', lineHeight: '1.6' }}>
                                                <p>Không thể dùng mệnh lệnh hành chính để xóa bỏ tôn giáo. Cần nâng cao đời sống vật chất và tinh thần, phát triển giáo dục khoa học - những điều kiện cơ bản để tôn giáo dần mất đi cơ sở tồn tại một cách tự nhiên.</p>
                                            </div>
                                        </div>
                                        <div className="w-56 h-56 rounded-full overflow-hidden shadow-xl border-4 border-yellow-400 hover:scale-105 transition-all duration-300 flex-shrink-0 animate-float-slow">
                                            <img src="/5.1.3.png" alt="Tiếp cận bằng giáo dục" className="w-full h-full object-cover" />
                                        </div>
                                    </div>
                                </div>

                                {/* NGUYÊN TẮC CHÍNH SÁCH */}
                                <div className="absolute bottom-12 right-[-205px]">
                                    <div className="flex items-center gap-9 flex-row-reverse mb-8">
                                        <div className="w-[480px]">
                                            <h3 className="text-4xl font-bold text-yellow-400 mb-6" style={{ textAlign: 'left' }}>NGUYÊN TẮC CHÍNH SÁCH VIỆT NAM</h3>
                                            <div className="text-white text-base leading-7 space-y-4" style={{ textAlign: 'left', lineHeight: '1.7' }}>
                                                <p>1. Tôn trọng và bảo đảm quyền tự do tín ngưỡng, tôn giáo.<br />
                                                    2. Quản lý bằng pháp luật, phân biệt rõ hoạt động hợp pháp và lợi dụng tôn giáo.<br />
                                                    3. Đoàn kết giữa đồng bào có đạo và không có đạo.<br />
                                                    4. Phát huy các giá trị văn hóa, đạo đức tốt đẹp của tôn giáo.</p>
                                            </div>
                                        </div>
                                        <div className="w-52 h-52 rounded-full overflow-hidden shadow-xl border-4 border-yellow-400 hover:scale-105 transition-all duration-300 flex-shrink-0 animate-float-gentle">
                                            <img src="/5.1.4.png" alt="Nguyên tắc chính sách" className="w-full h-full object-cover scale-125" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Mobile layout (shown only on mobile) */}
                            <div className="md:hidden space-y-12 pt-4">
                                {/* CƠ SỞ LÝ LUẬN - Mobile */}
                                <div className="flex flex-col items-center text-center">
                                    <div className="w-40 h-40 rounded-full overflow-hidden shadow-xl border-4 border-yellow-400 mb-6">
                                        <img src="/5.1.1.png" alt="Cơ sở lý luận" className="w-full h-full object-cover scale-125" />
                                    </div>
                                    <div className="max-w-xs mx-auto">
                                        <h3 className="text-2xl font-bold text-yellow-400 mb-4">CƠ SỞ LÝ LUẬN TỪ CNXH KHOA HỌC</h3>
                                        <p className="text-white text-sm leading-relaxed">
                                            Tôn giáo là hình thái ý thức xã hội có tính lịch sử, phát sinh từ những điều kiện kinh tế-xã hội cụ thể. Nó tồn tại lâu dài vì những nguyên nhân sinh ra nó chưa thể khắc phục ngay trong thời kỳ quá độ.
                                        </p>
                                    </div>
                                </div>

                                {/* TÍNH HAI MẶT - Mobile */}
                                <div className="flex flex-col items-center text-center">
                                    <div className="w-40 h-40 rounded-full overflow-hidden shadow-xl border-[3px] border-yellow-400 mb-6">
                                        <img src="/5.1.2.png" alt="Tính hai mặt" className="w-full h-full object-cover scale-110" />
                                    </div>
                                    <div className="max-w-xs mx-auto">
                                        <h3 className="text-2xl font-bold text-yellow-400 mb-4">TÍNH HAI MẶT</h3>
                                        <p className="text-white text-sm leading-relaxed">
                                            Tôn giáo mang hai mặt đối lập thống nhất: mặt tích cực (giá trị đạo đức, văn hóa) và mặt tiêu cực (có thể trở thành công cụ mê hoặc, cản trở nhận thức khoa học). Chính sách cần dựa trên sự nhìn nhận toàn diện này.
                                        </p>
                                    </div>
                                </div>

                                {/* TIẾP CẬN BẰNG GIÁO DỤC - Mobile */}
                                <div className="flex flex-col items-center text-center">
                                    <div className="w-40 h-40 rounded-full overflow-hidden shadow-xl border-4 border-yellow-400 mb-6">
                                        <img src="/5.1.3.png" alt="Tiếp cận bằng giáo dục" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="max-w-xs mx-auto">
                                        <h3 className="text-xl font-bold text-yellow-400 mb-4">TIẾP CẬN BẰNG GIÁO DỤC</h3>
                                        <p className="text-white text-sm leading-relaxed">
                                            Không thể dùng mệnh lệnh hành chính để xóa bỏ tôn giáo. Cần nâng cao đời sống vật chất và tinh thần, phát triển giáo dục khoa học - những điều kiện cơ bản để tôn giáo dần mất đi cơ sở tồn tại một cách tự nhiên.
                                        </p>
                                    </div>
                                </div>

                                {/* NGUYÊN TẮC CHÍNH SÁCH - Mobile */}
                                <div className="flex flex-col items-center text-center">
                                    <div className="w-40 h-40 rounded-full overflow-hidden shadow-xl border-4 border-yellow-400 mb-6">
                                        <img src="/5.1.4.png" alt="Nguyên tắc chính sách" className="w-full h-full object-cover scale-125" />
                                    </div>
                                    <div className="max-w-xs mx-auto">
                                        <h3 className="text-2xl font-bold text-yellow-400 mb-4">NGUYÊN TẮC CHÍNH SÁCH VIỆT NAM</h3>
                                        <div className="text-white text-sm leading-relaxed space-y-2">
                                            <p>1. Tôn trọng và bảo đảm quyền tự do tín ngưỡng, tôn giáo.</p>
                                            <p>2. Quản lý bằng pháp luật, phân biệt rõ hoạt động hợp pháp và lợi dụng tôn giáo.</p>
                                            <p>3. Đoàn kết giữa đồng bào có đạo và không có đạo.</p>
                                            <p>4. Phát huy các giá trị văn hóa, đạo đức tốt đẹp của tôn giáo.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* Nút mũi tên xuống để chuyển section - Adjusted position for mobile */}
                        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce">
                            <button
                                onClick={() => scrollToNextSection('quan-diem-chinh-sach')}
                                className="text-yellow-300 hover:text-yellow-400 transition-colors duration-300 hover:scale-110 transform"
                                aria-label="Chuyển đến section tiếp theo"
                            >
                                <ChevronDown className="w-8 h-8" />
                            </button>
                        </div>
                    </div>
                </section>

                {/* Giá trị thực tiễn của tôn giáo */}
                <section id="gia-tri-thuc-tien" className="relative overflow-hidden bg-red-900 py-12 md:py-20 min-h-[1000px] md:min-h-[1400px]">
                    {/* Video nền */}
                    <video
                        className="absolute inset-0 w-full h-full object-cover opacity-30"
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                    >
                        <source src="/5.2.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>

                    {/* Overlay để làm sẫm video */}
                    <div className="absolute inset-0 bg-black bg-opacity-50"></div>

                    {/* Tiêu đề */}
                    <div className="relative z-10 text-center mb-8 md:mb-12 pt-4 md:pt-8 px-4">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-yellow-400 uppercase mb-3 md:mb-4 tracking-wide">
                            GIÁ TRỊ THỰC TIỄN CỦA TÔN GIÁO
                        </h2>
                        <p className="text-white text-sm md:text-lg opacity-90 px-2">
                            Từ thiện, nhân đạo • Thi đua yêu nước • Bảo vệ môi trường • Phòng chống dịch bệnh
                        </p>
                        <div className="w-24 md:w-32 h-1 bg-yellow-400 mx-auto mt-4 md:mt-6"></div>
                    </div>

                    {/* Container */}
                    <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 min-h-[800px] md:min-h-[1200px] mt-8 md:mt-12">

                        {/* Desktop layout (hidden on mobile) */}
                        <div className="hidden md:block">
                            {/* TRONG HOẠT ĐỘNG TỪ THIỆN, NHÂN ĐẠO */}
                            <div className="absolute top-[180px] left-[-50px] flex items-center gap-10">
                                <div className="w-56 h-56 rounded-full overflow-hidden shadow-2xl border-4 border-yellow-400 flex-shrink-0 hover:scale-105 transition-all duration-500 animate-float">
                                    <img
                                        src="/5.2.1.png"
                                        alt="Từ thiện, nhân đạo"
                                        className="w-full h-full object-cover scale-110 transform hover:scale-125 transition-transform duration-300"
                                    />
                                </div>
                                <div className="w-[450px] text-left">
                                    <h3 className="text-4xl font-bold text-yellow-300 mb-5">Từ thiện, nhân đạo</h3>
                                    <p className="text-white leading-9 text-xl mb-4">
                                        Nhiều tôn giáo có giáo lý khuyến khích từ bi, bác ái. Trong điều kiện Việt Nam, những giáo lý này được chuyển hóa thành các hoạt động cụ thể: xây nhà tình nghĩa, cứu trợ thiên tai, chăm sóc người yếu thế.
                                    </p>
                                    <p className="text-yellow-200 font-semibold">Ý nghĩa xã hội: Bổ sung cho hệ thống an sinh xã hội, góp phần thực hiện mục tiêu công bằng và nhân văn.</p>
                                </div>
                            </div>

                            {/* TRONG PHONG TRÀO THI ĐUA YÊU NƯỚC */}
                            <div className="absolute top-[650px] left-[30px] flex items-center gap-8">
                                <div className="w-44 h-44 rounded-full overflow-hidden shadow-2xl border-4 border-yellow-400 flex-shrink-0 hover:scale-105 transition-all duration-500 animate-float-delay">
                                    <img
                                        src="/5.2.2.png"
                                        alt="Thi đua yêu nước"
                                        className="w-full h-full object-cover scale-110 transform hover:scale-125 transition-transform duration-300"
                                    />
                                </div>
                                <div className="w-[480px] text-left">
                                    <h3 className="text-3xl font-bold text-yellow-300 mb-4">Thi đua yêu nước</h3>
                                    <p className="text-white text-lg mb-4">
                                        Phương châm 'Người Công giáo tốt cũng là công dân tốt' thể hiện sự gắn kết giữa đức tin và trách nhiệm công dân. Khi giáo dân tích cực tham gia xây dựng quê hương, họ đang đồng thời thực hành giáo lý và đóng góp vào sự phát triển chung.
                                    </p>
                                    <p className="text-yellow-200 font-semibold">Ý nghĩa xã hội: Củng cố mối liên hệ giữa tôn giáo và cộng đồng, tăng cường sự đồng thuận xã hội.</p>
                                </div>
                            </div>

                            {/* TRONG BẢO VỆ MÔI TRƯỜNG */}
                            <div className="absolute top-[80px] right-[-40px] flex items-center gap-12">
                                <div className="w-48 h-48 rounded-full overflow-hidden shadow-2xl border-4 border-yellow-400 flex-shrink-0 hover:scale-105 transition-all duration-500 animate-float-slow">
                                    <img
                                        src="/5.2.3.png"
                                        alt="Bảo vệ môi trường"
                                        className="w-full h-full object-cover scale-110 transform hover:scale-125 transition-transform duration-300"
                                    />
                                </div>
                                <div className="w-[400px] text-left">
                                    <h3 className="text-3xl font-bold text-yellow-300 mb-4">Bảo vệ môi trường</h3>
                                    <p className="text-white text-lg mb-4">
                                        Các tôn giáo thường có quan niệm về mối quan hệ giữa con người và tự nhiên. Phật giáo nói đến lòng từ bi với chúng sinh, Công giáo nhấn mạnh trách nhiệm quản lý thiên nhiên.
                                    </p>
                                    <p className="text-yellow-200 font-semibold">Chuyển hóa thành hành động: Các phong trào 'chùa xanh', 'giáo xứ xanh' biến những quan niệm này thành hoạt động bảo vệ môi trường cụ thể.</p>
                                </div>
                            </div>

                            {/* TRONG PHÒNG CHỐNG DỊCH BỆNH, THIÊN TAI */}
                            <div className="absolute top-[400px] right-[20px] flex items-center gap-9">
                                <div className="w-48 h-48 rounded-full overflow-hidden shadow-2xl border-4 border-yellow-400 flex-shrink-0 hover:scale-105 transition-all duration-500 animate-float-gentle">
                                    <img
                                        src="/5.2.4.png"
                                        alt="Phòng chống dịch bệnh"
                                        className="w-full h-full object-cover scale-100 transform hover:scale-115 transition-transform duration-300"
                                    />
                                </div>
                                <div className="w-[420px] text-left">
                                    <h3 className="text-4xl font-bold text-yellow-300 mb-5">Phòng chống dịch bệnh, thiên tai</h3>
                                    <p className="text-white text-xl mb-4">
                                        Đại dịch COVID-19 trở thành 'bài kiểm tra' thực tế về khả năng phối hợp giữa Nhà nước và các tổ chức tôn giáo. Nhiều cơ sở tôn giáo đã trở thành điểm cứu trợ, phân phát nhu yếu phẩm, vận động tuân thủ biện pháp phòng dịch.
                                    </p>
                                    <p className="text-yellow-200 font-semibold">Ý nghĩa xã hội: Thể hiện tiềm năng của tôn giáo như một kênh vận động xã hội hiệu quả trong những tình huống khẩn cấp.</p>
                                </div>
                            </div>
                        </div>

                        {/* Mobile layout (shown only on mobile) */}
                        <div className="md:hidden space-y-10 pt-4">
                            {/* BẢO VỆ MÔI TRƯỜNG - Mobile */}
                            <div className="flex flex-col items-center text-center">
                                <div className="w-36 h-36 rounded-full overflow-hidden shadow-2xl border-4 border-yellow-400 mb-4">
                                    <img
                                        src="/5.2.3.png"
                                        alt="Bảo vệ môi trường"
                                        className="w-full h-full object-cover scale-110"
                                    />
                                </div>
                                <div className="max-w-xs mx-auto">
                                    <h3 className="text-xl font-bold text-yellow-300 mb-3">Bảo vệ môi trường</h3>
                                    <p className="text-white text-sm leading-relaxed mb-3">
                                        Các tôn giáo thường có quan niệm về mối quan hệ giữa con người và tự nhiên. Phật giáo nói đến lòng từ bi với chúng sinh, Công giáo nhấn mạnh trách nhiệm quản lý thiên nhiên.
                                    </p>
                                    <p className="text-yellow-200 font-semibold text-sm">
                                        Chuyển hóa thành hành động: Các phong trào 'chùa xanh', 'giáo xứ xanh' biến những quan niệm này thành hoạt động bảo vệ môi trường cụ thể.
                                    </p>
                                </div>
                            </div>

                            {/* TỪ THIỆN, NHÂN ĐẠO - Mobile */}
                            <div className="flex flex-col items-center text-center">
                                <div className="w-40 h-40 rounded-full overflow-hidden shadow-2xl border-4 border-yellow-400 mb-4">
                                    <img
                                        src="/5.2.1.png"
                                        alt="Từ thiện, nhân đạo"
                                        className="w-full h-full object-cover scale-110"
                                    />
                                </div>
                                <div className="max-w-xs mx-auto">
                                    <h3 className="text-2xl font-bold text-yellow-300 mb-3">Từ thiện, nhân đạo</h3>
                                    <p className="text-white text-sm leading-relaxed mb-3">
                                        Nhiều tôn giáo có giáo lý khuyến khích từ bi, bác ái. Trong điều kiện Việt Nam, những giáo lý này được chuyển hóa thành các hoạt động cụ thể: xây nhà tình nghĩa, cứu trợ thiên tai, chăm sóc người yếu thế.
                                    </p>
                                    <p className="text-yellow-200 font-semibold text-sm">
                                        Ý nghĩa xã hội: Bổ sung cho hệ thống an sinh xã hội, góp phần thực hiện mục tiêu công bằng và nhân văn.
                                    </p>
                                </div>
                            </div>

                            {/* PHÒNG CHỐNG DỊCH BỆNH, THIÊN TAI - Mobile */}
                            <div className="flex flex-col items-center text-center">
                                <div className="w-36 h-36 rounded-full overflow-hidden shadow-2xl border-4 border-yellow-400 mb-4">
                                    <img
                                        src="/5.2.4.png"
                                        alt="Phòng chống dịch bệnh"
                                        className="w-full h-full object-cover scale-100"
                                    />
                                </div>
                                <div className="max-w-xs mx-auto">
                                    <h3 className="text-xl font-bold text-yellow-300 mb-3">Phòng chống dịch bệnh, thiên tai</h3>
                                    <p className="text-white text-sm leading-relaxed mb-3">
                                        Đại dịch COVID-19 trở thành 'bài kiểm tra' thực tế về khả năng phối hợp giữa Nhà nước và các tổ chức tôn giáo. Nhiều cơ sở tôn giáo đã trở thành điểm cứu trợ, phân phát nhu yếu phẩm, vận động tuân thủ biện pháp phòng dịch.
                                    </p>
                                    <p className="text-yellow-200 font-semibold text-sm">
                                        Ý nghĩa xã hội: Thể hiện tiềm năng của tôn giáo như một kênh vận động xã hội hiệu quả trong những tình huống khẩn cấp.
                                    </p>
                                </div>
                            </div>

                            {/* THI ĐUA YÊU NƯỚC - Mobile */}
                            <div className="flex flex-col items-center text-center">
                                <div className="w-32 h-32 rounded-full overflow-hidden shadow-2xl border-4 border-yellow-400 mb-4">
                                    <img
                                        src="/5.2.2.png"
                                        alt="Thi đua yêu nước"
                                        className="w-full h-full object-cover scale-110"
                                    />
                                </div>
                                <div className="max-w-xs mx-auto">
                                    <h3 className="text-lg font-bold text-yellow-300 mb-3">Thi đua yêu nước</h3>
                                    <p className="text-white text-sm leading-relaxed mb-3">
                                        Phương châm 'Người Công giáo tốt cũng là công dân tốt' thể hiện sự gắn kết giữa đức tin và trách nhiệm công dân. Khi giáo dân tích cực tham gia xây dựng quê hương, họ đang đồng thời thực hành giáo lý và đóng góp vào sự phát triển chung.
                                    </p>
                                    <p className="text-yellow-200 font-semibold text-sm">
                                        Ý nghĩa xã hội: Củng cố mối liên hệ giữa tôn giáo và cộng đồng, tăng cường sự đồng thuận xã hội.
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Nút mũi tên xuống để chuyển section */}
                    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce">
                        <button
                            onClick={() => scrollToNextSection('gia-tri-thuc-tien')}
                            className="text-yellow-300 hover:text-yellow-400 transition-colors duration-300 hover:scale-110 transform"
                            aria-label="Chuyển đến section tiếp theo"
                        >
                            <ChevronDown className="w-8 h-8" />
                        </button>
                    </div>
                </section>

                {/* === SECTION VIDEO GIẢI THÍCH === */}
                <section id="video-giang-giai" className="py-16 bg-gradient-to-b from-red-900/90 to-black/90 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-5">
                        <div className="absolute inset-0 bg-repeat" style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23fbbf24' fill-opacity='0.2' fill-rule='evenodd'/%3E%3C/svg%3E")`,
                            backgroundSize: '400px'
                        }}></div>
                    </div>

                    <div className="container mx-auto px-4 relative z-10">
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center gap-3 mb-4 px-6 py-2 bg-yellow-400/10 backdrop-blur-sm rounded-full border border-yellow-400/30">
                                <span className="text-2xl">🎬</span>
                                <span className="text-yellow-300 font-bold text-lg tracking-wide">VIDEO GIẢNG GIẢI TRỰC QUAN</span>
                                <span className="text-2xl">📽️</span>
                            </div>

                            <h2 className="text-4xl md:text-5xl font-bold text-yellow-400 mb-4">
                                TÔN GIÁO TRONG XÃ HỘI HIỆN ĐẠI
                            </h2>
                            <p className="text-xl text-white/90 max-w-3xl mx-auto">
                                Vai trò và đóng góp của tôn giáo trong thời kỳ quá độ lên chủ nghĩa xã hội
                            </p>
                            <div className="w-40 h-1 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 mx-auto mt-6 rounded-full"></div>
                        </div>

                        {/* PHẦN GIỚI THIỆU MỚI - FLEXBOX ĐỒNG BỘ */}
                        <div className="max-w-5xl mx-auto mb-12">
                            <div className="text-center mb-8">
                                <h2 className="text-3xl font-bold text-yellow-400 mb-2">Vì Sao Cần Hiểu Đúng Về Tôn Giáo?</h2>
                                <div className="w-48 h-1 bg-gradient-to-r from-yellow-400 to-red-600 mx-auto rounded-full"></div>
                            </div>

                            <div className="bg-gradient-to-b from-yellow-50/10 to-red-900/30 backdrop-blur-lg rounded-2xl p-8 border-2 border-yellow-400/30">
                                <div className="text-center mb-8">
                                    <h3 className="text-3xl font-bold text-yellow-300 mb-4">
                                        Để Hiểu Vai Trò Của Tôn Giáo Trong Xã Hội Hiện Đại
                                    </h3>
                                    <p className="text-white/90 text-xl mb-6 max-w-3xl mx-auto">
                                        Video dưới đây sẽ phân tích cách tiếp cận biện chứng của Nhà nước Việt Nam đối với tôn giáo:
                                    </p>
                                    <p className="text-white/90 text-xl mb-6 max-w-3xl mx-auto">
                                        Video mang tính minh họa học thuật, giúp trực quan hóa nội dung lý luận trong bài học MLN131.
                                    </p>
                                </div>

                                {/* === FIXED: CHUYỂN TỪ GRID SANG FLEXBOX === */}
                                <div className="flex flex-col md:flex-row gap-8">
                                    {/* Quan điểm Mác-Lênin */}
                                    <div className="group relative flex-1">
                                        <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 to-red-800/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
                                        <div className="relative bg-gradient-to-b from-red-50/10 to-red-900/30 backdrop-blur-lg rounded-2xl p-6 border-2 border-red-400/30 group-hover:border-red-400/60 transition-all duration-300 group-hover:scale-[1.02] h-full">
                                            <div className="flex flex-col items-center text-center h-full">
                                                <div className="relative mb-4">
                                                    <div className="absolute inset-0 bg-red-400/20 rounded-full blur-md"></div>
                                                    <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center shadow-2xl">
                                                        <span className="text-white text-2xl">📚</span>
                                                    </div>
                                                </div>

                                                <h4 className="text-2xl font-bold text-red-300 mb-3">Quan điểm Mác-Lênin</h4>

                                                <div className="bg-red-900/40 rounded-xl p-3 w-full mb-4">
                                                    <span className="text-yellow-200/80 text-sm">Cơ sở lý luận</span>
                                                    <p className="text-yellow-400 font-bold mt-1">Tính lịch sử</p>
                                                </div>

                                                <p className="text-white/80 text-center leading-relaxed mb-4">
                                                    Tôn giáo là hình thái ý thức xã hội có tính lịch sử
                                                </p>

                                                <div className="mt-auto pt-4 border-t border-red-400/20 w-full text-center">
                                                    <span className="text-red-300/70 text-sm">• Phân tích khoa học •</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Vận dụng sáng tạo */}
                                    <div className="group relative flex-1">
                                        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-orange-700/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
                                        <div className="relative bg-gradient-to-b from-yellow-50/10 to-orange-900/30 backdrop-blur-lg rounded-2xl p-6 border-2 border-yellow-400/30 group-hover:border-yellow-400/60 transition-all duration-300 group-hover:scale-[1.02] h-full">
                                            <div className="flex flex-col items-center text-center h-full">
                                                <div className="relative mb-4">
                                                    <div className="absolute inset-0 bg-yellow-400/20 rounded-full blur-md"></div>
                                                    <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center shadow-2xl">
                                                        <span className="text-white text-2xl">🔄</span>
                                                    </div>
                                                </div>

                                                <h4 className="text-2xl font-bold text-yellow-300 mb-3">Vận dụng sáng tạo</h4>

                                                <div className="bg-orange-900/40 rounded-xl p-3 w-full mb-4">
                                                    <span className="text-yellow-200/80 text-sm">Thích nghi</span>
                                                    <p className="text-yellow-400 font-bold mt-1">Điều kiện Việt Nam</p>
                                                </div>

                                                <p className="text-white/80 text-center leading-relaxed mb-4">
                                                    Vận dụng lý luận vào thực tiễn Việt Nam
                                                </p>

                                                <div className="mt-auto pt-4 border-t border-yellow-400/20 w-full text-center">
                                                    <span className="text-yellow-300/70 text-sm">• Linh hoạt • Thực tiễn •</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Phát huy giá trị tích cực - HIGHLIGHTED */}
                                    <div className="group relative flex-1">
                                        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-red-600/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
                                        <div className="relative bg-gradient-to-b from-yellow-100/10 to-red-900/40 backdrop-blur-lg rounded-2xl p-6 border-3 border-yellow-400 group-hover:border-yellow-300 transition-all duration-300 group-hover:scale-[1.02] h-full shadow-xl">
                                            <div className="flex flex-col items-center text-center h-full">
                                                <div className="relative mb-4">
                                                    <div className="absolute inset-0 bg-yellow-400/30 rounded-full blur-md"></div>
                                                    <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center shadow-2xl">
                                                        <span className="text-white text-2xl">⭐</span>
                                                    </div>
                                                    <div className="absolute -top-2 -right-2 bg-yellow-500 text-xs font-bold text-white px-2 py-1 rounded-full">
                                                        TRỌNG TÂM
                                                    </div>
                                                </div>

                                                <h4 className="text-2xl font-bold text-yellow-400 mb-3">Phát huy giá trị tích cực</h4>

                                                <div className="bg-gradient-to-r from-yellow-500/20 to-red-500/20 rounded-xl p-3 w-full mb-4 border border-yellow-400/30">
                                                    <span className="text-yellow-200 text-sm">Chính sách thực tiễn</span>
                                                    <p className="text-yellow-300 font-bold mt-1">Đạo đức + Văn hóa</p>
                                                </div>

                                                <p className="text-white font-medium text-center leading-relaxed mb-4">
                                                    Khai thác mặt tích cực của tôn giáo
                                                </p>

                                                <div className="mt-auto pt-4 border-t border-yellow-400/30 w-full text-center">
                                                    <span className="text-yellow-400 text-sm font-semibold">• Đóng góp xã hội •</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* === END FLEXBOX FIX === */}

                                {/* TIMELINE INDICATOR - GIỮ NGUYÊN */}
                                <div className="flex items-center justify-center mt-8 pt-6 border-t border-yellow-400/20">
                                    <div className="text-center">
                                        <p className="text-white/80 text-lg mb-3">
                                            <span className="text-yellow-300 font-bold">Mỗi giai đoạn</span> thể hiện sự phát triển trong nhận thức và chính sách
                                        </p>
                                        <div className="flex items-center justify-center gap-2 mt-2">
                                            <div className="text-sm text-yellow-300/80">Lý luận cơ bản</div>
                                            <div className="w-16 h-1 bg-gradient-to-r from-yellow-400/40 to-yellow-400 rounded-full"></div>
                                            <div className="text-sm font-bold text-yellow-400 px-2">→ THỰC TIỄN ←</div>
                                            <div className="w-16 h-1 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full"></div>
                                            <div className="text-sm text-yellow-300">Đóng góp xã hội</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* MAIN VIDEO CONTAINER - CENTERED */}
                        <div className="max-w-5xl mx-auto">
                            <div className="bg-gradient-to-br from-black/60 to-red-900/40 backdrop-blur-sm rounded-3xl p-2 md:p-3 border-2 border-yellow-400/30 shadow-2xl">
                                <div className="aspect-video rounded-2xl overflow-hidden border border-yellow-400/20 bg-black">
                                    <video
                                        className="w-full h-full object-cover"
                                        controls
                                        autoPlay={false}
                                        muted={false}
                                        playsInline
                                        preload="metadata"
                                        title="Tôn giáo trong xã hội hiện đại: Vai trò và đóng góp"
                                    >
                                        <source src="/6.0.mp4" type="video/mp4" />
                                        Trình duyệt của bạn không hỗ trợ thẻ video.
                                    </video>
                                </div>
                            </div>

                            {/* 3-COLUMN FLEXBOX - UPGRADED PREMIUM DESIGN */}
                            <div className="mt-12">
                                <div className="text-center mb-8">
                                    <h2 className="text-3xl font-bold text-yellow-400 mb-2">Thông Tin Video</h2>
                                    <div className="w-32 h-1 bg-gradient-to-r from-yellow-400 to-red-600 mx-auto rounded-full"></div>
                                </div>

                                <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto px-4">
                                    {/* Thời lượng - Enhanced */}
                                    <div className="group relative flex-1">
                                        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-red-800/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
                                        <div className="relative bg-gradient-to-b from-yellow-50/10 to-red-900/30 backdrop-blur-lg rounded-2xl p-8 border-2 border-yellow-400/30 group-hover:border-yellow-400/60 transition-all duration-300 group-hover:scale-[1.02] h-full">
                                            <div className="flex flex-col items-center h-full">
                                                <div className="relative mb-6">
                                                    <div className="absolute inset-0 bg-yellow-400/20 rounded-full blur-md"></div>
                                                    <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center shadow-2xl">
                                                        <span className="text-white text-3xl">⏱️</span>
                                                    </div>
                                                </div>

                                                <h4 className="text-2xl font-bold text-yellow-300 mb-4">Thời Lượng</h4>

                                                <div className="bg-red-900/40 rounded-xl p-4 w-full mb-4">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="text-yellow-200/80 text-sm">Thời lượng video</span>
                                                        <span className="text-yellow-400 font-bold">52s</span>
                                                    </div>
                                                    <div className="w-full bg-red-800/40 rounded-full h-2">
                                                        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full w-3/4"></div>
                                                    </div>
                                                </div>

                                                <p className="text-white/90 text-center text-lg leading-relaxed mt-auto">
                                                    Video giải thích trực quan, dễ hiểu, tối ưu cho việc học tập
                                                </p>

                                                <div className="mt-6 pt-4 border-t border-yellow-400/20 w-full text-center">
                                                    <span className="text-yellow-300/70 text-sm">• Tối ưu tiếp thu • Trực quan • Hiệu quả</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Nội dung - Enhanced */}
                                    <div className="group relative flex-1">
                                        <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 to-red-800/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
                                        <div className="relative bg-gradient-to-b from-red-50/10 to-red-900/30 backdrop-blur-lg rounded-2xl p-8 border-2 border-red-400/30 group-hover:border-red-400/60 transition-all duration-300 group-hover:scale-[1.02] h-full">
                                            <div className="flex flex-col items-center h-full">
                                                <div className="relative mb-6">
                                                    <div className="absolute inset-0 bg-red-400/20 rounded-full blur-md"></div>
                                                    <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center shadow-2xl">
                                                        <span className="text-white text-3xl">🎯</span>
                                                    </div>
                                                </div>

                                                <h4 className="text-2xl font-bold text-red-300 mb-4">Nội Dung</h4>

                                                <div className="space-y-3 w-full mb-6">
                                                    <div className="flex items-center gap-3 bg-red-900/40 p-3 rounded-lg">
                                                        <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center">
                                                            <span className="text-yellow-400 text-lg">1</span>
                                                        </div>
                                                        <span className="text-white/90">Phân tích quan điểm Mác-Lênin về tôn giáo</span>
                                                    </div>
                                                    <div className="flex items-center gap-3 bg-red-900/40 p-3 rounded-lg">
                                                        <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center">
                                                            <span className="text-yellow-400 text-lg">2</span>
                                                        </div>
                                                        <span className="text-white/90">Vận dụng sáng tạo vào điều kiện Việt Nam</span>
                                                    </div>
                                                    <div className="flex items-center gap-3 bg-red-900/40 p-3 rounded-lg">
                                                        <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center">
                                                            <span className="text-yellow-400 text-lg">3</span>
                                                        </div>
                                                        <span className="text-white/90">Phát huy giá trị tích cực của tôn giáo</span>
                                                    </div>
                                                </div>

                                                <p className="text-white/90 text-center text-lg leading-relaxed mt-auto">
                                                    Phân tích sâu, đa chiều về vai trò tôn giáo trong xã hội hiện đại
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Nguồn - Enhanced */}
                                    <div className="group relative flex-1">
                                        <div className="absolute inset-0 bg-gradient-to-br from-yellow-600/10 to-red-800/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
                                        <div className="relative bg-gradient-to-b from-yellow-50/10 to-red-900/30 backdrop-blur-lg rounded-2xl p-8 border-2 border-yellow-400/30 group-hover:border-yellow-400/60 transition-all duration-300 group-hover:scale-[1.02] h-full">
                                            <div className="flex flex-col items-center h-full">
                                                <div className="relative mb-6">
                                                    <div className="absolute inset-0 bg-yellow-400/20 rounded-full blur-md"></div>
                                                    <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center shadow-2xl">
                                                        <span className="text-white text-3xl">📁</span>
                                                    </div>
                                                </div>

                                                <h4 className="text-2xl font-bold text-yellow-300 mb-4">Nguồn</h4>

                                                <div className="bg-gradient-to-r from-yellow-500/10 to-red-500/10 rounded-xl p-5 w-full mb-6 border border-yellow-400/20">
                                                    <div className="text-center">
                                                        <p className="text-yellow-300 font-bold text-lg mb-1">MLN131</p>
                                                        <p className="text-white/80 text-sm">Môn: Chủ nghĩa xã hội khoa học</p>
                                                    </div>
                                                </div>

                                                <div className="space-y-2 w-full mb-4">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                                                        <span className="text-white/80 text-sm">Video bài giảng nội bộ</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                                                        <span className="text-white/80 text-sm">Tài liệu học tập chính thức</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                                                        <span className="text-white/80 text-sm">Nội dung đã được kiểm duyệt</span>
                                                    </div>
                                                </div>
                                                {/* English Description */}
                                                <div className="w-full mt-1 p-4 rounded-xl bg-black/20 border border-yellow-400/20">
                                                    <p className="text-yellow-300 font-semibold text-sm mb-1">
                                                        English Description
                                                    </p>
                                                    <p className="text-white/80 text-sm leading-relaxed">
                                                        An educational video explaining Marxist–Leninist perspectives on religion
                                                        and their practical application in Vietnam.
                                                    </p>
                                                </div>

                                                <p className="text-white/90 text-center text-lg leading-relaxed mt-auto">
                                                    Tài liệu chất lượng cao dành cho giáo dục
                                                </p>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* BOTTOM SECTION - 4-POINT CHECKLIST - SINGLE COLUMN CENTERED */}
                            <div className="mt-10 flex justify-center">
                                <div className="bg-gradient-to-r from-red-800/40 to-red-900/40 backdrop-blur-sm rounded-2xl p-6 border border-yellow-400/20 max-w-3xl w-full">
                                    <h4 className="text-yellow-300 font-bold text-xl mb-6 text-center">
                                        <span className="text-2xl mr-3">📚</span>
                                        Bạn sẽ hiểu rõ sau video:
                                    </h4>

                                    {/* 4-POINT LIST - CENTERED */}
                                    <div className="space-y-4 max-w-2xl mx-auto text-center">
                                        <div className="flex items-center justify-center gap-3">
                                            <span className="text-yellow-400 text-xl flex-shrink-0">✓</span>
                                            <span className="text-white">Quan điểm Mác-Lênin về tôn giáo trong bối cảnh hiện đại</span>
                                        </div>
                                        <div className="flex items-center justify-center gap-3">
                                            <span className="text-yellow-400 text-xl flex-shrink-0">✓</span>
                                            <span className="text-white">Cách Nhà nước Việt Nam vận dụng lý luận Mác–Lênin vào thực tiễn</span>
                                        </div>
                                        <div className="flex items-center justify-center gap-3">
                                            <span className="text-yellow-400 text-xl flex-shrink-0">✓</span>
                                            <span className="text-white">Giá trị tích cực của tôn giáo trong xã hội</span>
                                        </div>
                                        <div className="flex items-center justify-center gap-3">
                                            <span className="text-yellow-400 text-xl flex-shrink-0">✓</span>
                                            <span className="text-white">Chính sách tôn giáo trong thời kỳ quá độ</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* CHEVRON DOWN BUTTON */}
                        <div className="text-center mt-12">
                            <button
                                onClick={() => scrollToNextSection('video-giang-giai')}
                                className="text-yellow-300 hover:text-yellow-400 transition-colors duration-300 hover:scale-110 transform"
                                aria-label="Chuyển đến phần tiếp theo"
                            >
                                <ChevronDown className="w-8 h-8 mx-auto" />
                            </button>
                        </div>
                    </div>
                </section>



                {/* Section: Câu hỏi suy ngẫm - ĐẦY ĐỦ BACKGROUND */}
                <section id="cau-hoi-suy-ngam" className="min-h-screen bg-gradient-to-br from-red-700 via-red-800 to-red-900 relative overflow-hidden py-16">
                    {/* === 1. VIDEO BACKGROUND - ĐÃ THÊM LẠI === */}
                    <video
                        className="absolute inset-0 w-full h-full object-cover opacity-15"
                        autoPlay
                        muted
                        loop
                        playsInline
                    >
                        <source src="/5.1.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>

                    {/* === 2. VIDEO OVERLAY - Làm tối video === */}
                    <div className="absolute inset-0 bg-black bg-opacity-50 z-5"></div>

                    {/* === 3. PATTERN BACKGROUND ĐỘNG === */}
                    <div className="absolute inset-0 opacity-15 z-10">
                        <div className="absolute inset-0 bg-repeat opacity-20" style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffd770' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                        }}></div>
                    </div>

                    {/* === 4. ANIMATED GRADIENT OVERLAY === */}
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-red-600/3 animate-pulse z-10"></div>

                    {/* === NỘI DUNG CHÍNH === */}
                    <div className="relative z-20 container mx-auto px-4">
                        {/* Tiêu đề chính - UPGRADED */}
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center gap-3 mb-4 px-6 py-2 bg-yellow-400/10 backdrop-blur-sm rounded-full border border-yellow-400/30">
                                <span className="text-2xl">🤔</span>
                                <span className="text-yellow-300 font-bold text-lg tracking-wide">CÂU HỎI SUY NGẪM</span>
                                <span className="text-2xl">💭</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold text-yellow-400 mb-4 tracking-tight">
                                Khám Phá Tính Biện Chứng Trong Chính Sách Tôn Giáo
                            </h1>
                            <p className="text-xl text-white/90 max-w-3xl mx-auto">
                                Phân tích sự thống nhất giữa lý luận Mác-Lênin và thực tiễn Việt Nam
                            </p>
                            <div className="w-40 h-1 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 mx-auto mt-6 rounded-full"></div>
                        </div>

                        {/* Main Content - UPGRADED WITH FLEXBOX */}
                        <div className="max-w-5xl mx-auto">
                            <div className="bg-gradient-to-br from-black/60 to-red-900/40 backdrop-blur-lg rounded-3xl p-2 border-2 border-yellow-400/30 shadow-2xl">
                                <div className="bg-gradient-to-b from-red-900/20 to-black/40 rounded-2xl p-8 border border-yellow-400/20">

                                    {/* Question Section - FLEXBOX LAYOUT */}
                                    <div className="mb-10">
                                        <div className="flex flex-col md:flex-row items-start gap-6 mb-8">
                                            {/* Question Icon */}
                                            <div className="flex-shrink-0">
                                                <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 text-black rounded-full w-14 h-14 flex items-center justify-center text-2xl font-black shadow-lg">
                                                    ?
                                                </div>
                                            </div>

                                            {/* Question Content */}
                                            <div className="flex-1">
                                                <div className="mb-4">
                                                    <h4 className="text-yellow-300 font-bold text-2xl mb-3 flex items-center gap-3">
                                                        <span className="text-3xl">🎯</span>
                                                        Câu hỏi thảo luận trọng tâm:
                                                    </h4>
                                                </div>

                                                <div className="bg-gradient-to-r from-yellow-500/10 to-red-500/10 rounded-xl p-6 border-l-4 border-yellow-400">
                                                    <p className="text-white text-xl leading-relaxed font-medium">
                                                        <span className="text-yellow-300 font-bold">"Phân tích tính biện chứng trong quan điểm của Nhà nước Việt Nam về tôn giáo:</span>
                                                        <br />
                                                        <span className="text-white">Một mặt, dựa trên lý luận Mác-Lênin coi tôn giáo là hình thái ý thức xã hội có tính lịch sử.</span>
                                                        <br />
                                                        <span className="text-yellow-400 font-bold">Mặt khác, lại chủ trương 'phát huy giá trị tốt đẹp của tôn giáo'.</span>
                                                        <br />
                                                        <span className="text-white">Làm thế nào để hiểu sự thống nhất của hai mặt tưởng như mâu thuẫn này?"</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Connection to Previous Video */}
                                        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-4 border border-blue-400/20 mb-8">
                                            <div className="flex items-center gap-3">
                                                <span className="text-blue-400 text-2xl">📺</span>
                                                <div>
                                                    <p className="text-white/90 font-medium">
                                                        <span className="text-blue-300">Đã xem video về vai trò tôn giáo?</span>
                                                        <br />
                                                        <span className="text-white/70 text-sm">Video trước đã phân tích cách tiếp cận của Việt Nam. Bây giờ hãy cùng suy ngẫm sâu hơn về tính biện chứng trong chính sách.</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Thinking Hints - FLEXBOX GRID */}
                                    <div className="mb-10">
                                        <div className="flex items-center gap-3 mb-6">
                                            <span className="text-3xl">💡</span>
                                            <h5 className="text-yellow-300 font-bold text-xl">Gợi ý tư duy để phân tích:</h5>
                                        </div>

                                        {/* 3 COLUMNS WITH FLEXBOX */}
                                        <div className="flex flex-col md:flex-row gap-6">
                                            {/* Hint 1 */}
                                            <div className="flex-1 group">
                                                <div className="relative h-full">
                                                    <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 to-red-800/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
                                                    <div className="relative bg-gradient-to-b from-red-50/10 to-red-900/30 backdrop-blur-lg rounded-2xl p-6 border-2 border-red-400/30 group-hover:border-red-400/60 transition-all duration-300 group-hover:scale-[1.02] h-full">
                                                        <div className="flex flex-col items-center text-center h-full">
                                                            <div className="relative mb-4">
                                                                <div className="absolute inset-0 bg-red-400/20 rounded-full blur-md"></div>
                                                                <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center shadow-2xl">
                                                                    <span className="text-white text-xl">📜</span>
                                                                </div>
                                                            </div>

                                                            <h6 className="text-red-300 font-bold text-lg mb-3">1. Bối cảnh lịch sử</h6>

                                                            <div className="bg-red-900/40 rounded-xl p-3 w-full mb-4">
                                                                <span className="text-yellow-200/80 text-sm">Phân tích quan điểm Mác-Lênin</span>
                                                                <p className="text-yellow-400 font-bold mt-1">Trong bối cảnh ra đời</p>
                                                            </div>

                                                            <p className="text-white/80 text-center leading-relaxed text-sm">
                                                                Mác phê phán tôn giáo trong xã hội tư bản thế kỷ XIX. Liệu quan điểm đó có áp dụng nguyên xi cho mọi hoàn cảnh?
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Hint 2 */}
                                            <div className="flex-1 group">
                                                <div className="relative h-full">
                                                    <div className="absolute inset-0 bg-gradient-to-br from-orange-600/10 to-orange-800/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
                                                    <div className="relative bg-gradient-to-b from-orange-50/10 to-orange-900/30 backdrop-blur-lg rounded-2xl p-6 border-2 border-orange-400/30 group-hover:border-orange-400/60 transition-all duration-300 group-hover:scale-[1.02] h-full">
                                                        <div className="flex flex-col items-center text-center h-full">
                                                            <div className="relative mb-4">
                                                                <div className="absolute inset-0 bg-orange-400/20 rounded-full blur-md"></div>
                                                                <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center shadow-2xl">
                                                                    <span className="text-white text-xl">⚖️</span>
                                                                </div>
                                                            </div>

                                                            <h6 className="text-orange-300 font-bold text-lg mb-3">2. Nguyên tắc lịch sử-cụ thể</h6>

                                                            <div className="bg-orange-900/40 rounded-xl p-3 w-full mb-4">
                                                                <span className="text-yellow-200/80 text-sm">Vận dụng linh hoạt</span>
                                                                <p className="text-yellow-400 font-bold mt-1">Điều kiện Việt Nam</p>
                                                            </div>

                                                            <p className="text-white/80 text-center leading-relaxed text-sm">
                                                                Lý luận cần được vận dụng phù hợp với điều kiện cụ thể. Việt Nam có truyền thống văn hóa tâm linh đặc thù.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Hint 3 */}
                                            <div className="flex-1 group">
                                                <div className="relative h-full">
                                                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-yellow-800/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
                                                    <div className="relative bg-gradient-to-b from-yellow-50/10 to-yellow-900/30 backdrop-blur-lg rounded-2xl p-6 border-2 border-yellow-400/30 group-hover:border-yellow-400/60 transition-all duration-300 group-hover:scale-[1.02] h-full">
                                                        <div className="flex flex-col items-center text-center h-full">
                                                            <div className="relative mb-4">
                                                                <div className="absolute inset-0 bg-yellow-400/20 rounded-full blur-md"></div>
                                                                <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-700 flex items-center justify-center shadow-2xl">
                                                                    <span className="text-white text-xl">🌟</span>
                                                                </div>
                                                            </div>

                                                            <h6 className="text-yellow-300 font-bold text-lg mb-3">3. Tính hai mặt của tôn giáo</h6>

                                                            <div className="bg-yellow-900/40 rounded-xl p-3 w-full mb-4">
                                                                <span className="text-yellow-200/80 text-sm">Nhìn nhận toàn diện</span>
                                                                <p className="text-yellow-400 font-bold mt-1">Tích cực + Tiêu cực</p>
                                                            </div>

                                                            <p className="text-white/80 text-center leading-relaxed text-sm">
                                                                Mọi hiện tượng xã hội đều có mặt tích cực và tiêu cực. Trong điều kiện mới, có thể tạo điều kiện để mặt tích cực phát triển?
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Answer Button - UPGRADED */}
                                    <div className="text-center">
                                        <div className="mb-4">
                                            <p className="text-white/70 text-sm mb-2">Sẵn sàng khám phá câu trả lời phân tích?</p>
                                        </div>

                                        <button
                                            onClick={() => setShowAnswerModal(true)}
                                            className="group relative inline-flex items-center gap-4 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white font-bold py-4 px-8 rounded-full text-lg shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
                                        >
                                            <span className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-transparent transform -skew-x-12 group-hover:translate-x-full transition-transform duration-500"></span>
                                            <span className="text-2xl">💡</span>
                                            <span className="relative">KHÁM PHÁ CÂU TRẢ LỜI PHÂN TÍCH</span>
                                            <span className="text-2xl">🔍</span>
                                        </button>

                                        <div className="mt-4 flex items-center justify-center gap-2">
                                            <span className="text-yellow-300/60 text-xs">•</span>
                                            <span className="text-white/60 text-xs">Phân tích biện chứng</span>
                                            <span className="text-yellow-300/60 text-xs">•</span>
                                            <span className="text-white/60 text-xs">Logic khoa học</span>
                                            <span className="text-yellow-300/60 text-xs">•</span>
                                            <span className="text-white/60 text-xs">Kết luận sâu sắc</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Modal câu trả lời - ĐÃ FIX FLEXBOX VÀ BỔ SUNG KẾT LUẬN */}
                        {showAnswerModal && (
                            <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                                <div className="relative max-w-5xl w-full max-h-[90vh] overflow-hidden rounded-3xl border-4 border-yellow-400/50 shadow-2xl">
                                    {/* Modal background */}
                                    {/* Background Pattern ĐỘNG - ĐÃ THÊM LẠI */}
                                    <div className="absolute inset-0 opacity-20">
                                        <div className="absolute inset-0 bg-repeat opacity-30" style={{
                                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffd770' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                                        }}></div>
                                    </div>

                                    <div className="relative z-10 p-2">
                                        {/* Modal header */}
                                        <div className="flex items-center justify-between p-6 bg-gradient-to-r from-yellow-500/20 to-red-600/20 backdrop-blur-sm border-b border-yellow-400/30">
                                            <div className="flex items-center gap-4">
                                                <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full w-12 h-12 flex items-center justify-center shadow-lg">
                                                    <span className="text-2xl">💡</span>
                                                </div>
                                                <div>
                                                    <h3 className="text-3xl font-bold text-yellow-400">CÂU TRẢ LỜI PHÂN TÍCH</h3>
                                                    <p className="text-yellow-300/80 text-sm">Phân tích biện chứng, logic</p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => setShowAnswerModal(false)}
                                                className="text-white hover:text-yellow-400 text-3xl font-bold transition-colors duration-300 bg-red-900/50 hover:bg-red-800/50 w-10 h-10 rounded-full flex items-center justify-center"
                                            >
                                                ✕
                                            </button>
                                        </div>

                                        {/* Modal content - ĐÃ FIX FLEXBOX */}
                                        <div className="p-6 overflow-y-auto max-h-[70vh]">
                                            <div className="space-y-6">

                                                {/* PHẦN 1: Phân tích quan điểm Mác-Lênin - FIXED: DÙNG FLEXBOX */}
                                                <div className="bg-gradient-to-b from-black/50 to-red-900/30 rounded-2xl p-6 border border-yellow-400/20">
                                                    <div className="flex items-center gap-3 mb-6">
                                                        <div className="bg-yellow-400 text-black rounded-full w-8 h-8 flex items-center justify-center font-bold">1</div>
                                                        <h4 className="text-yellow-300 font-bold text-xl">PHÂN TÍCH QUAN ĐIỂM MÁC-LÊNIN TRONG BỐI CẢNH</h4>
                                                    </div>

                                                    {/* ==== FIX: CHUYỂN TỪ GRID SANG FLEXBOX ==== */}
                                                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                                                        {/* Bối cảnh thế kỷ XIX */}
                                                        <div className="flex-1 bg-red-800/40 rounded-xl p-4 border border-red-400/30">
                                                            <div className="flex items-center gap-2 mb-3">
                                                                <span className="text-red-300">📜</span>
                                                                <h5 className="text-red-300 font-bold">Bối cảnh thế kỷ XIX</h5>
                                                            </div>
                                                            <p className="text-white/80 text-sm mb-2"><strong>Đặc điểm:</strong> Xã hội tư bản công nghiệp</p>
                                                            <p className="text-white/70 text-xs">Tôn giáo thường bị giai cấp thống trị sử dụng như công cụ hợp pháp hóa sự áp bức</p>
                                                            <div className="mt-3 pt-2 border-t border-red-400/20">
                                                                <span className="text-red-300/60 text-xs">• Phê phán chức năng ý thức hệ •</span>
                                                            </div>
                                                        </div>

                                                        {/* Nội dung cốt lõi */}
                                                        <div className="flex-1 bg-orange-800/40 rounded-xl p-4 border border-yellow-400/30">
                                                            <div className="flex items-center gap-2 mb-3">
                                                                <span className="text-yellow-300">🎯</span>
                                                                <h5 className="text-yellow-300 font-bold">Nội dung cốt lõi</h5>
                                                            </div>
                                                            <p className="text-white/80 text-sm mb-2"><strong>Phương pháp:</strong> Duy vật lịch sử</p>
                                                            <p className="text-white/70 text-xs">Phân tích tôn giáo như một hiện tượng xã hội, gắn với điều kiện vật chất</p>
                                                            <div className="mt-3 pt-2 border-t border-yellow-400/20">
                                                                <span className="text-yellow-300/60 text-xs">• Tính lịch sử • Tính xã hội •</span>
                                                            </div>
                                                        </div>

                                                        {/* Giới hạn lịch sử */}
                                                        <div className="flex-1 bg-gradient-to-b from-yellow-500/20 to-red-600/20 rounded-xl p-4 border-2 border-yellow-400">
                                                            <div className="flex items-center gap-2 mb-3">
                                                                <span className="text-yellow-400">⚠️</span>
                                                                <h5 className="text-yellow-400 font-bold">Giới hạn lịch sử</h5>
                                                            </div>
                                                            <p className="text-white font-semibold text-sm mb-2"><strong>Vấn đề:</strong> Áp dụng nguyên xi</p>
                                                            <p className="text-yellow-100 text-xs font-medium">Liệu quan điểm thế kỷ XIX có áp dụng được cho mọi hoàn cảnh?</p>
                                                            <div className="mt-3 pt-2 border-t border-yellow-400/30">
                                                                <span className="text-yellow-400 text-xs font-bold">• Cần vận dụng sáng tạo •</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* ========================================= */}

                                                    <div className="bg-gradient-to-r from-yellow-500/10 to-red-500/10 rounded-lg p-4 border-l-4 border-yellow-400">
                                                        <p className="text-yellow-200 text-sm">
                                                            <strong>Kết luận:</strong> Quan điểm Mác-Lênin cung cấp <strong>phương pháp luận khoa học</strong> để phân tích tôn giáo, nhưng cần được <strong>vận dụng linh hoạt</strong> trong từng bối cảnh cụ thể.
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* PHẦN 2: Vận dụng vào điều kiện Việt Nam - ĐÃ FIX */}
                                                <div className="bg-gradient-to-b from-black/50 to-purple-900/30 rounded-2xl p-6 border border-purple-400/20">
                                                    <div className="flex items-center gap-3 mb-4">
                                                        <div className="bg-purple-400 text-black rounded-full w-8 h-8 flex items-center justify-center font-bold">2</div>
                                                        <h4 className="text-purple-300 font-bold text-xl">VẬN DỤNG VÀO ĐIỀU KIỆN VIỆT NAM</h4>
                                                    </div>

                                                    <div className="space-y-4">
                                                        {/* Sử dụng FLEXBOX thay vì GRID */}
                                                        <div className="flex flex-col md:flex-row gap-4">
                                                            {/* Truyền thống văn hóa */}
                                                            <div className="flex-1 bg-red-900/30 rounded-lg p-4">
                                                                <div className="flex items-center gap-2 mb-3">
                                                                    <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                                                                        <span className="text-red-400">🏮</span>
                                                                    </div>
                                                                    <h5 className="text-red-300 font-bold">Truyền thống văn hóa:</h5>
                                                                </div>
                                                                <ul className="text-white/80 space-y-2">
                                                                    <li className="flex items-start gap-2">
                                                                        <span className="text-red-400 mt-1">•</span>
                                                                        <div>
                                                                            <strong className="text-red-200">Tôn giáo gắn với văn hóa dân tộc</strong>
                                                                            <p className="text-white/60 text-xs mt-1">Phật giáo, Đạo giáo hòa quyện với tín ngưỡng dân gian</p>
                                                                        </div>
                                                                    </li>
                                                                    <li className="flex items-start gap-2">
                                                                        <span className="text-red-400 mt-1">•</span>
                                                                        <div>
                                                                            <strong className="text-red-200">Tính chất đặc thù</strong>
                                                                            <p className="text-white/60 text-xs mt-1">Không có xung đột tôn giáo kéo dài như nhiều nước</p>
                                                                        </div>
                                                                    </li>
                                                                    <li className="flex items-start gap-2">
                                                                        <span className="text-red-400 mt-1">•</span>
                                                                        <div>
                                                                            <strong className="text-red-200">Tinh thần khoan dung</strong>
                                                                            <p className="text-white/60 text-xs mt-1">Các tôn giáo chung sống hòa bình qua nhiều thế kỷ</p>
                                                                        </div>
                                                                    </li>
                                                                </ul>
                                                            </div>

                                                            {/* Nhu cầu phát triển */}
                                                            <div className="flex-1 bg-gradient-to-b from-yellow-500/20 to-orange-600/20 rounded-lg p-4 border border-yellow-400/30">
                                                                <div className="flex items-center gap-2 mb-3">
                                                                    <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center">
                                                                        <span className="text-yellow-400">🚀</span>
                                                                    </div>
                                                                    <h5 className="text-yellow-300 font-bold">Nhu cầu phát triển:</h5>
                                                                </div>
                                                                <ul className="text-yellow-100 space-y-2">
                                                                    <li className="flex items-start gap-2">
                                                                        <span className="text-yellow-400 mt-1">•</span>
                                                                        <div>
                                                                            <strong className="text-yellow-300">Đoàn kết toàn dân</strong>
                                                                            <p className="text-yellow-100/60 text-xs mt-1">Cần huy động mọi nguồn lực cho phát triển</p>
                                                                        </div>
                                                                    </li>
                                                                    <li className="flex items-start gap-2">
                                                                        <span className="text-yellow-400 mt-1">•</span>
                                                                        <div>
                                                                            <strong className="text-yellow-300">Ổn định xã hội</strong>
                                                                            <p className="text-yellow-100/60 text-xs mt-1">Tôn giáo ổn định góp phần vào ổn định chung</p>
                                                                        </div>
                                                                    </li>
                                                                    <li className="flex items-start gap-2">
                                                                        <span className="text-yellow-400 mt-1">•</span>
                                                                        <div>
                                                                            <strong className="text-yellow-300">Phát huy giá trị tích cực</strong>
                                                                            <p className="text-yellow-100/60 text-xs mt-1">Khai thác mặt tốt đẹp của tôn giáo cho xã hội</p>
                                                                        </div>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>

                                                        {/* Phần nguyên tắc vận dụng */}
                                                        <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg p-4">
                                                            <div className="flex items-start gap-3">
                                                                <div className="bg-gradient-to-br from-purple-500 to-blue-500 rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
                                                                    <span className="text-white text-xl">🔄</span>
                                                                </div>
                                                                <div>
                                                                    <h6 className="text-purple-300 font-bold mb-2">NGUYÊN TẮC VẬN DỤNG</h6>
                                                                    <p className="text-white text-sm leading-relaxed">
                                                                        Từ <strong className="text-red-300">"áp dụng máy móc"</strong> lý luận
                                                                        → sang <strong className="text-yellow-300">"vận dụng sáng tạo"</strong> phù hợp với điều kiện Việt Nam.
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* PHẦN 3: Tính hai mặt và phát huy giá trị tích cực */}
                                                <div className="bg-gradient-to-b from-black/50 to-blue-900/30 rounded-2xl p-6 border border-blue-400/20">
                                                    <div className="flex items-center gap-3 mb-4">
                                                        <div className="bg-blue-400 text-black rounded-full w-8 h-8 flex items-center justify-center font-bold">3</div>
                                                        <h4 className="text-blue-300 font-bold text-xl">TÍNH HAI MẶT VÀ PHÁT HUY GIÁ TRỊ TÍCH CỰC</h4>
                                                    </div>

                                                    <div className="space-y-4">
                                                        <div className="bg-blue-900/20 rounded-lg p-4">
                                                            <h5 className="text-blue-300 font-bold mb-3 flex items-center gap-2">
                                                                <span>⚖️</span>
                                                                Phân tích tính hai mặt của tôn giáo:
                                                            </h5>
                                                            <ul className="text-white/80 space-y-2 text-sm">
                                                                <li className="flex items-start gap-2">
                                                                    <span className="text-blue-400 mt-1">•</span>
                                                                    <span><strong>Mặt tích cực:</strong> Giá trị đạo đức (từ bi, bác ái), văn hóa, giáo dục, an ủi tinh thần</span>
                                                                </li>
                                                                <li className="flex items-start gap-2">
                                                                    <span className="text-blue-400 mt-1">•</span>
                                                                    <span><strong>Mặt tiêu cực:</strong> Có thể trở thành công cụ mê hoặc, cản trở nhận thức khoa học, bị lợi dụng</span>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="bg-green-900/20 rounded-lg p-4">
                                                            <h5 className="text-green-300 font-bold mb-3 flex items-center gap-2">
                                                                <span>🌟</span>
                                                                Phát huy giá trị tích cực:
                                                            </h5>
                                                            <ul className="text-white/80 space-y-2 text-sm">
                                                                <li className="flex items-start gap-2">
                                                                    <span className="text-green-400 mt-1">•</span>
                                                                    <span><strong>Không phủ nhận toàn bộ:</strong> Nhận diện và khai thác các giá trị tốt đẹp</span>
                                                                </li>
                                                                <li className="flex items-start gap-2">
                                                                    <span className="text-green-400 mt-1">•</span>
                                                                    <span><strong>Định hướng phát triển:</strong> Hướng các hoạt động tôn giáo vào mục tiêu xã hội chung</span>
                                                                </li>
                                                                <li className="flex items-start gap-2">
                                                                    <span className="text-green-400 mt-1">•</span>
                                                                    <span><strong>Tạo điều kiện:</strong> Để mặt tích cực được phát huy, mặt tiêu cực được hạn chế</span>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* PHẦN KẾT LUẬN - ĐÃ FIX */}
                                                <div className="bg-gradient-to-b from-yellow-500/20 to-orange-600/30 rounded-2xl p-6 border-2 border-yellow-400/50">
                                                    <div className="flex items-center gap-3 mb-4">
                                                        <div className="bg-gradient-to-br from-yellow-400 to-orange-500 text-black rounded-full w-8 h-8 flex items-center justify-center font-bold shadow-lg">
                                                            ✓
                                                        </div>
                                                        <h4 className="text-yellow-300 font-bold text-xl">KẾT LUẬN TỔNG HỢP</h4>
                                                    </div>

                                                    <div className="space-y-4">
                                                        {/* Tuyên bố chính */}
                                                        <div className="bg-gradient-to-r from-yellow-400/10 to-orange-500/10 rounded-lg p-5 border-l-4 border-yellow-400">
                                                            <p className="text-yellow-200 text-lg leading-relaxed font-medium">
                                                                Quan điểm của Nhà nước Việt Nam về tôn giáo thể hiện <strong className="text-yellow-300">tính biện chứng sâu sắc</strong>:
                                                                <br />
                                                                <strong className="text-yellow-300">Kế thừa phương pháp luận khoa học</strong> của chủ nghĩa Mác-Lênin,
                                                                <br />
                                                                nhưng <strong className="text-yellow-300">vận dụng linh hoạt, sáng tạo</strong> vào điều kiện cụ thể của Việt Nam.
                                                            </p>
                                                        </div>

                                                        {/* Bài học & Giá trị - FLEXBOX */}
                                                        <div className="flex flex-col md:flex-row gap-4">
                                                            {/* Sự thống nhất */}
                                                            <div className="flex-1 bg-black/40 rounded-lg p-4">
                                                                <div className="flex items-center gap-2 mb-3">
                                                                    <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center">
                                                                        <span className="text-yellow-400">🔄</span>
                                                                    </div>
                                                                    <h5 className="text-yellow-300 font-bold">Sự thống nhất biện chứng:</h5>
                                                                </div>
                                                                <ul className="text-white/80 space-y-3">
                                                                    <li className="flex items-start gap-2">
                                                                        <span className="text-yellow-400 mt-1">•</span>
                                                                        <div>
                                                                            <strong className="text-yellow-200">Không mâu thuẫn mà bổ sung</strong>
                                                                            <p className="text-white/60 text-xs mt-1">Lý luận về tính lịch sử và phát huy giá trị tích cực không đối lập</p>
                                                                        </div>
                                                                    </li>
                                                                    <li className="flex items-start gap-2">
                                                                        <span className="text-yellow-400 mt-1">•</span>
                                                                        <div>
                                                                            <strong className="text-yellow-200">Nhìn nhận toàn diện</strong>
                                                                            <p className="text-white/60 text-xs mt-1">Thấy cả bản chất lịch sử lẫn khả năng đóng góp hiện tại</p>
                                                                        </div>
                                                                    </li>
                                                                    <li className="flex items-start gap-2">
                                                                        <span className="text-yellow-400 mt-1">•</span>
                                                                        <div>
                                                                            <strong className="text-yellow-200">Phù hợp với thực tiễn</strong>
                                                                            <p className="text-white/60 text-xs mt-1">Đáp ứng nhu cầu phát triển và ổn định xã hội</p>
                                                                        </div>
                                                                    </li>
                                                                </ul>
                                                            </div>

                                                            {/* Ý nghĩa thực tiễn */}
                                                            <div className="flex-1 bg-red-900/40 rounded-lg p-4">
                                                                <div className="flex items-center gap-2 mb-3">
                                                                    <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                                                                        <span className="text-red-400">🎯</span>
                                                                    </div>
                                                                    <h5 className="text-red-300 font-bold">Ý nghĩa thực tiễn:</h5>
                                                                </div>
                                                                <ul className="text-white/80 space-y-3">
                                                                    <li className="flex items-start gap-2">
                                                                        <span className="text-red-400 mt-1">•</span>
                                                                        <div>
                                                                            <strong className="text-red-200">Tạo sự đồng thuận xã hội</strong>
                                                                            <p className="text-white/60 text-xs mt-1">Đoàn kết đồng bào có đạo và không có đạo</p>
                                                                        </div>
                                                                    </li>
                                                                    <li className="flex items-start gap-2">
                                                                        <span className="text-red-400 mt-1">•</span>
                                                                        <div>
                                                                            <strong className="text-red-200">Phát huy nguồn lực</strong>
                                                                            <p className="text-white/60 text-xs mt-1">Khai thác giá trị tích cực của tôn giáo cho phát triển</p>
                                                                        </div>
                                                                    </li>
                                                                    <li className="flex items-start gap-2">
                                                                        <span className="text-red-400 mt-1">•</span>
                                                                        <div>
                                                                            <strong className="text-red-200">Bảo đảm ổn định lâu dài</strong>
                                                                            <p className="text-white/60 text-xs mt-1">Giải quyết vấn đề tôn giáo bằng biện pháp phù hợp</p>
                                                                        </div>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>

                                                        {/* Câu trích dẫn cuối */}
                                                        <div className="bg-gradient-to-r from-red-500/10 to-yellow-500/10 rounded-lg p-4 border-l-4 border-yellow-400">
                                                            <div className="flex items-start gap-3">
                                                                <div className="text-2xl">💎</div>
                                                                <div>
                                                                    <p className="text-white text-sm italic leading-relaxed">
                                                                        "Chính sách tôn giáo của Việt Nam không phải là sự từ bỏ lý luận Mác-Lênin,
                                                                        mà là <strong className="text-yellow-300">sự vận dụng sáng tạo</strong> lý luận đó vào điều kiện cụ thể,
                                                                        thể hiện <strong className="text-yellow-300">tinh thần biện chứng và thực tiễn</strong>."
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {/* Scroll Indicator */}
                        <div className="text-center mt-16">
                            <div className="inline-flex flex-col items-center gap-2">
                                <span className="text-yellow-300/60 text-sm">Cuộn xuống để tiếp tục</span>
                                <button
                                    onClick={() => scrollToNextSection('cau-hoi-suy-ngam')}
                                    className="text-yellow-300 hover:text-yellow-400 transition-colors duration-300 hover:scale-110 transform animate-bounce"
                                    aria-label="Chuyển đến phần tiếp theo"
                                >
                                    <ChevronDown className="w-8 h-8" />
                                </button>
                            </div>
                        </div>
                    </div>
                </section>






                {/* Quiz */}
                <section id="quiz" className="py-16 bg-gradient-to-r from-red-900 to-red-800 relative overflow-hidden min-h-screen flex items-center" data-reveal>
                    {/* Video nền */}
                    <video
                        className="absolute inset-0 w-full h-full object-cover opacity-25"
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                    >
                        <source src="/quiz.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>

                    {/* Overlay để làm sẫm video */}
                    <div className="absolute inset-0 bg-black bg-opacity-60"></div>

                    <div className="container mx-auto px-4 relative z-10">
                        {/* Title với score hiển thị */}
                        <div className="text-center mb-12">
                            <h2 className="text-4xl md:text-5xl font-bold text-yellow-300 mb-4 tracking-wider relative">
                                <span className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                                    KIỂM TRA KIẾN THỨC
                                </span>
                                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 rounded-full"></div>
                            </h2>
                            <p className="text-lg text-white opacity-90 font-medium">
                                TÔN GIÁO TRONG THỜI KỲ QUÁ ĐỘ LÊN CHỦ NGHĨA XÃ HỘI
                            </p>

                            {/* Score Display - Hiển thị điểm số */}
                            {score > 0 && (
                                <div className="mt-4 inline-flex items-center gap-3 bg-yellow-400/20 backdrop-blur-sm px-4 py-2 rounded-full border border-yellow-400/30">
                                    <div className="flex items-center gap-2">
                                        <span className="text-yellow-300 text-xl">🏆</span>
                                        <span className="text-yellow-300 font-bold">Điểm:</span>
                                        <span className="text-white font-bold text-xl">{score}/{quizQuestions.length}</span>
                                    </div>
                                    <div className="h-4 w-px bg-yellow-400/50"></div>
                                    <div className="text-yellow-200 text-sm">
                                        {score === quizQuestions.length ? "🎉 Xuất sắc!" :
                                            score >= quizQuestions.length * 0.8 ? "👍 Rất tốt!" :
                                                score >= quizQuestions.length * 0.6 ? "😊 Khá tốt" : "💪 Cố gắng thêm"}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="max-w-3xl mx-auto">
                            <Card className="bg-yellow-50 border-yellow-400 shadow-2xl backdrop-blur-sm bg-opacity-95">
                                <CardHeader className="bg-gradient-to-r from-red-800 via-red-700 to-red-800 text-yellow-300 py-4">
                                    <div className="flex justify-between items-center">
                                        <CardTitle className="text-xl font-bold">
                                            Câu {currentQuiz + 1} / {quizQuestions.length}
                                        </CardTitle>
                                        {score > 0 && (
                                            <div className="text-sm bg-yellow-400/20 px-3 py-1 rounded-full">
                                                <span className="text-yellow-300">Đúng: </span>
                                                <span className="text-white font-bold">{score}</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="w-full bg-red-900 rounded-full h-1.5 mt-2">
                                        <div
                                            className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-1.5 rounded-full transition-all duration-500"
                                            style={{ width: `${((currentQuiz + 1) / quizQuestions.length) * 100}%` }}
                                        ></div>
                                    </div>
                                </CardHeader>

                                <CardContent className="p-6">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-6 leading-relaxed">{quizQuestions[currentQuiz].question}</h3>
                                    <div className="space-y-3 mb-6">
                                        {quizQuestions[currentQuiz].options.map((option, index) => (
                                            <Button
                                                key={index}
                                                variant={selectedAnswer === index ? (index === quizQuestions[currentQuiz].correct ? 'default' : 'destructive') : 'outline'}
                                                className={`w-full text-left justify-start p-4 h-auto text-sm transition-all duration-300 ${selectedAnswer === index
                                                    ? index === quizQuestions[currentQuiz].correct
                                                        ? 'bg-green-600 hover:bg-green-700 text-white shadow-lg'
                                                        : 'bg-red-600 hover:bg-red-700 text-white shadow-lg'
                                                    : 'border-gray-400 text-black hover:bg-gray-100 hover:border-gray-500 bg-white'
                                                    } ${showAnswer && index === quizQuestions[currentQuiz].correct ? 'bg-green-600 text-white shadow-lg' : ''}`}
                                                onClick={() => handleQuizAnswer(index)}
                                                disabled={showAnswer}
                                            >
                                                <span className="mr-3 font-bold bg-red-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">
                                                    {String.fromCharCode(65 + index)}
                                                </span>
                                                <span className="flex-1 text-black">{option}</span>
                                            </Button>
                                        ))}
                                    </div>

                                    {showAnswer && (
                                        <div className="mb-6">
                                            {selectedAnswer === quizQuestions[currentQuiz].correct ? (
                                                // Đúng - Hiển thị giải thích
                                                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border-l-4 border-green-600 shadow-lg">
                                                    <div className="flex items-start space-x-3">
                                                        <div className="flex-shrink-0 w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                                                            <span className="text-white text-sm font-bold">✓</span>
                                                        </div>
                                                        <div>
                                                            <p className="text-green-800 font-semibold mb-1">Chính xác! +1 điểm</p>
                                                            <p className="text-green-700 text-sm leading-relaxed">{quizQuestions[currentQuiz].explanation}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                // Sai - Hiển thị thông báo sai và đáp án đúng
                                                <div className="space-y-3">
                                                    <div className="bg-gradient-to-r from-red-50 to-pink-50 p-4 rounded-lg border-l-4 border-red-600 shadow-lg">
                                                        <div className="flex items-center space-x-3">
                                                            <div className="flex-shrink-0 w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
                                                                <span className="text-white text-sm font-bold">✗</span>
                                                            </div>
                                                            <p className="text-red-800 font-semibold">Chưa chính xác. Đáp án đúng là: {String.fromCharCode(65 + quizQuestions[currentQuiz].correct)}</p>
                                                        </div>
                                                    </div>
                                                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border-l-4 border-blue-600 shadow-lg">
                                                        <div className="flex items-start space-x-3">
                                                            <div className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                                                                <span className="text-white text-sm font-bold">i</span>
                                                            </div>
                                                            <p className="text-blue-800 text-sm leading-relaxed">{quizQuestions[currentQuiz].explanation}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {showAnswer && currentQuiz < quizQuestions.length - 1 && (
                                        <div className="text-center">
                                            <Button onClick={nextQuestion} className="bg-gradient-to-r from-red-800 to-red-700 hover:from-red-700 hover:to-red-600 text-yellow-300 px-6 py-2 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                                                Câu tiếp theo <ArrowRight className="ml-2 h-4 w-4" />
                                            </Button>
                                        </div>
                                    )}

                                    {showAnswer && currentQuiz === quizQuestions.length - 1 && (
                                        <div className="text-center space-y-4">
                                            {/* Kết quả cuối cùng */}
                                            <div className="bg-gradient-to-br from-yellow-400/20 via-orange-500/20 to-red-600/20 backdrop-blur-sm rounded-2xl p-6 border-2 border-yellow-400/30 shadow-2xl">
                                                <div className="flex flex-col items-center">
                                                    {/* Biểu tượng kết quả */}
                                                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center mb-4 shadow-lg">
                                                        {score === quizQuestions.length ? (
                                                            <span className="text-4xl">🏆</span>
                                                        ) : score >= quizQuestions.length * 0.8 ? (
                                                            <span className="text-4xl">⭐</span>
                                                        ) : score >= quizQuestions.length * 0.6 ? (
                                                            <span className="text-4xl">👍</span>
                                                        ) : (
                                                            <span className="text-4xl">💪</span>
                                                        )}
                                                    </div>

                                                    {/* Thông báo kết quả */}
                                                    <h3 className="text-2xl font-bold text-yellow-400 mb-2">
                                                        {score === quizQuestions.length ? "🎉 XUẤT SẮC!" :
                                                            score >= quizQuestions.length * 0.8 ? "🌟 RẤT TỐT!" :
                                                                score >= quizQuestions.length * 0.6 ? "👍 KHÁ TỐT" : "💪 CỐ GẮNG HƠN"}
                                                    </h3>

                                                    {/* Điểm số */}
                                                    <div className="text-4xl font-bold text-white mb-3">
                                                        <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                                                            {score}/{quizQuestions.length}
                                                        </span>
                                                    </div>

                                                    {/* Phần trăm */}
                                                    <div className="text-lg text-yellow-300 mb-4">
                                                        Đạt {Math.round((score / quizQuestions.length) * 100)}%
                                                    </div>

                                                    {/* Thanh progress */}
                                                    <div className="w-full max-w-xs bg-red-900/50 rounded-full h-3 mb-6">
                                                        <div
                                                            className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 h-3 rounded-full transition-all duration-1000 ease-out"
                                                            style={{ width: `${(score / quizQuestions.length) * 100}%` }}
                                                        ></div>
                                                    </div>

                                                    {/* Lời nhắn */}
                                                    <p className="text-white text-center max-w-md mb-6">
                                                        {score === quizQuestions.length ?
                                                            "Bạn đã nắm vững kiến thức về tôn giáo trong thời kỳ quá độ!" :
                                                            "Hãy tiếp tục nghiên cứu để hiểu sâu hơn về chính sách tôn giáo!"}
                                                    </p>

                                                    {/* Nút làm lại */}
                                                    <Button
                                                        onClick={() => {
                                                            setCurrentQuiz(0);
                                                            setSelectedAnswer(null);
                                                            setShowAnswer(false);
                                                            setScore(0);
                                                        }}
                                                        className="bg-gradient-to-r from-red-800 to-red-700 hover:from-red-700 hover:to-red-600 text-yellow-300 px-8 py-3 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 rounded-full"
                                                    >
                                                        <RefreshCw className="mr-2 h-4 w-4" />
                                                        Làm lại bài kiểm tra
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>

                        {/* Nút mũi tên xuống */}
                        <div className="text-center mt-8">
                            <button
                                onClick={() => scrollToNextSection('quiz')}
                                className="text-yellow-300 hover:text-yellow-400 transition-colors duration-300 hover:scale-110 transform bg-black bg-opacity-30 rounded-full p-3"
                                aria-label="Chuyển đến section tiếp theo"
                            >
                                <ChevronDown className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                </section>

                {/* AI Transparency Section - Traditional Vietnamese Style */}
                <section id="tinh-minh-bach-ai" className="relative bg-gradient-to-br from-red-800 via-red-900 to-black py-10 md:py-20" data-reveal>
                    {/* Video nền động */}
                    <video
                        className="absolute inset-0 w-full h-full object-cover opacity-20"
                        autoPlay
                        muted
                        loop
                        playsInline
                    >
                        <source src="/5.2.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>

                    {/* Overlay để làm sẫm video */}
                    <div className="absolute inset-0 bg-black bg-opacity-60 z-5"></div>

                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10 z-10">
                        <div className="absolute inset-0 bg-repeat opacity-30" style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffd770' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                        }}></div>
                    </div>

                    <div className="relative z-20 max-w-7xl mx-auto px-4 md:px-6">
                        {/* Header section */}
                        <div className="text-center mb-10 md:mb-16">
                            <div className="inline-flex items-center gap-2 md:gap-4 mb-4 md:mb-6 px-4 md:px-8 py-2 md:py-3 bg-yellow-400/20 backdrop-blur-sm rounded-full border-2 border-yellow-400/50">
                                <span className="text-xl md:text-3xl">🤖</span>
                                <span className="text-yellow-300 text-sm md:text-lg font-bold tracking-wide font-mono">
                                    TÍNH MINH BẠCH KHI SỬ DỤNG AI
                                </span>
                                <span className="text-xl md:text-3xl">📋</span>
                            </div>

                            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-yellow-400 mb-3 md:mb-4 tracking-wide px-2">
                                Công cụ AI trong Học thuật
                            </h2>
                            <p className="text-base md:text-xl text-white/90 max-w-3xl mx-auto px-3">
                                Cam kết minh bạch về việc sử dụng AI trong tạo hình ảnh minh họa cho bài thuyết trình
                            </p>
                            <div className="w-24 md:w-32 h-1 bg-yellow-400 mx-auto mt-4 md:mt-6"></div>
                        </div>

                        {/* 8 ô nội dung - phong cách truyền thống */}
                        <div className="max-w-6xl mx-auto space-y-6 md:space-y-8">
                            {/* Ô 1 - Công cụ AI đã sử dụng */}
                            <div className="w-full mx-auto bg-gradient-to-r from-yellow-50 to-orange-50 border-3 md:border-4 border-yellow-400 p-4 md:p-6 lg:p-8 rounded-2xl md:rounded-3xl shadow-xl md:shadow-2xl hover:shadow-yellow-400/20 transition-all duration-300">
                                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-red-800 mb-4 md:mb-6 flex items-center">
                                    <span className="bg-red-800 text-yellow-400 rounded-full w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 flex items-center justify-center text-base md:text-lg lg:text-xl font-black mr-3 md:mr-6">1</span>
                                    Công cụ AI đã sử dụng
                                </h3>
                                <div className="space-y-4 md:space-y-6">
                                    <div className="bg-white/80 rounded-xl md:rounded-2xl p-4 md:p-6 border-2 border-red-200">
                                        <h4 className="text-red-700 font-bold text-lg md:text-xl mb-2 md:mb-3 flex items-center gap-2 md:gap-3">
                                            <span className="text-xl md:text-2xl">🎥</span>
                                            Runway Gen-2
                                        </h4>
                                        <p className="text-red-600 text-sm md:text-base lg:text-lg leading-relaxed">Tạo video minh họa chính từ prompt mô tả chi tiết, chuyển cảnh mượt mà.</p>
                                    </div>
                                    <div className="bg-white/80 rounded-xl md:rounded-2xl p-4 md:p-6 border-2 border-red-200">
                                        <h4 className="text-red-700 font-bold text-lg md:text-xl mb-2 md:mb-3 flex items-center gap-2 md:gap-3">
                                            <span className="text-xl md:text-2xl">🎨</span>
                                            GPT (OpenAI)
                                        </h4>
                                        <p className="text-red-600 text-sm md:text-base lg:text-lg leading-relaxed">Tạo minh họa, biểu tượng, texture và background theo prompt chi tiết.</p>
                                    </div>
                                    <div className="bg-white/80 rounded-xl md:rounded-2xl p-4 md:p-6 border-2 border-red-200">
                                        <h4 className="text-red-700 font-bold text-lg md:text-xl mb-2 md:mb-3 flex items-center gap-2 md:gap-3">
                                            <span className="text-xl md:text-2xl">🌟</span>
                                            Gemini (Google)
                                        </h4>
                                        <p className="text-red-600 text-sm md:text-base lg:text-lg leading-relaxed">Tạo ảnh/đồ họa bổ sung và biến thể để đa dạng hóa trải nghiệm.</p>
                                    </div>
                                    <div className="bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-lg md:rounded-xl p-4 md:p-6 border-l-4 border-yellow-400">
                                        <p className="text-red-700 font-semibold text-sm md:text-base lg:text-lg">
                                            → Nội dung video được tạo bằng AI để minh họa khái niệm, timeline, poster mô phỏng phong cách cổ động.
                                        </p>
                                        <p className="text-red-700 font-semibold text-sm md:text-base lg:text-lg mt-2 md:mt-3">
                                            → Các hình ảnh AI được sử dụng để làm cho bài giảng về tôn giáo trong thời kỳ quá độ trở nên hấp dẫn và trực quan hơn.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Ô 2 - Mục đích sử dụng AI */}
                            <div className="w-full mx-auto bg-gradient-to-r from-red-50 to-pink-50 border-3 md:border-4 border-red-400 p-4 md:p-8 lg:p-10 rounded-2xl md:rounded-3xl shadow-xl md:shadow-2xl hover:shadow-red-400/20 transition-all duration-300">
                                <h3 className="text-xl md:text-3xl lg:text-4xl font-bold text-red-800 mb-4 md:mb-6 lg:mb-8 flex items-center">
                                    <span className="bg-red-800 text-yellow-400 rounded-full w-8 h-8 md:w-10 md:h-10 lg:w-14 lg:h-14 flex items-center justify-center text-base md:text-xl lg:text-2xl font-black mr-3 md:mr-6 lg:mr-8">2</span>
                                    Mục đích sử dụng AI trong Học thuật
                                </h3>
                                <div className="space-y-4 md:space-y-6">
                                    <div className="bg-white/95 rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8 border-2 md:border-3 border-red-200 shadow-md md:shadow-lg">
                                        <div className="flex items-start gap-3 md:gap-6">
                                            <div className="text-3xl md:text-4xl lg:text-6xl flex-shrink-0">📈</div>
                                            <div className="flex-1">
                                                <h4 className="text-red-700 font-bold text-lg md:text-xl lg:text-2xl mb-2 md:mb-4">Nâng cao trải nghiệm người dùng (UX)</h4>
                                                <ul className="text-red-600 text-sm md:text-base lg:text-lg space-y-1 md:space-y-2">
                                                    <li className="flex items-start gap-2 md:gap-3">
                                                        <span className="text-red-500 text-base md:text-xl mt-0.5">•</span>
                                                        <span>Tạo hình ảnh trực quan cho các khái niệm học thuật</span>
                                                    </li>
                                                    <li className="flex items-start gap-2 md:gap-3">
                                                        <span className="text-red-500 text-base md:text-xl mt-0.5">•</span>
                                                        <span>Sơ đồ hóa các mối quan hệ phức tạp thành hình ảnh dễ hiểu</span>
                                                    </li>
                                                    <li className="flex items-start gap-2 md:gap-3">
                                                        <span className="text-red-500 text-base md:text-xl mt-0.5">•</span>
                                                        <span>Thiết kế layout và background phù hợp với chủ đề</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white/95 rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8 border-2 md:border-3 border-red-200 shadow-md md:shadow-lg">
                                        <div className="flex items-start gap-3 md:gap-6">
                                            <div className="text-3xl md:text-4xl lg:text-6xl flex-shrink-0">🎨</div>
                                            <div className="flex-1">
                                                <h4 className="text-red-700 font-bold text-lg md:text-xl lg:text-2xl mb-2 md:mb-4">Tạo minh họa chuyên biệt</h4>
                                                <ul className="text-red-600 text-sm md:text-base lg:text-lg space-y-1 md:space-y-2">
                                                    <li className="flex items-start gap-2 md:gap-3">
                                                        <span className="text-red-500 text-base md:text-xl mt-0.5">•</span>
                                                        <span>Tạo biểu tượng và icon phù hợp với nội dung học thuật</span>
                                                    </li>
                                                    <li className="flex items-start gap-2 md:gap-3">
                                                        <span className="text-red-500 text-base md:text-xl mt-0.5">•</span>
                                                        <span>Thiết kế poster và banner theo phong cách cổ động</span>
                                                    </li>
                                                    <li className="flex items-start gap-2 md:gap-3">
                                                        <span className="text-red-500 text-base md:text-xl mt-0.5">•</span>
                                                        <span>Tạo texture và pattern nền phù hợp với theme</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white/95 rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8 border-2 md:border-3 border-red-200 shadow-md md:shadow-lg">
                                        <div className="flex items-start gap-3 md:gap-6">
                                            <div className="text-3xl md:text-4xl lg:text-6xl flex-shrink-0">⚖️</div>
                                            <div className="flex-1">
                                                <h4 className="text-red-700 font-bold text-lg md:text-xl lg:text-2xl mb-2 md:mb-4">Đảm bảo tính chính xác và đạo đức</h4>
                                                <ul className="text-red-600 text-sm md:text-base lg:text-lg space-y-1 md:space-y-2">
                                                    <li className="flex items-start gap-2 md:gap-3">
                                                        <span className="text-red-500 text-base md:text-xl mt-0.5">•</span>
                                                        <span>Chỉ mang tính minh họa, không thay thế tài liệu gốc</span>
                                                    </li>
                                                    <li className="flex items-start gap-2 md:gap-3">
                                                        <span className="text-red-500 text-base md:text-xl mt-0.5">•</span>
                                                        <span>Không tạo giả mạo tư liệu lịch sử hay chứng cứ</span>
                                                    </li>
                                                    <li className="flex items-start gap-2 md:gap-3">
                                                        <span className="text-red-500 text-base md:text-xl mt-0.5">•</span>
                                                        <span>Tuân thủ nguyên tắc học thuật và bản quyền</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Ô 3 - Vai trò hỗ trợ */}
                            <div className="w-full mx-auto bg-gradient-to-r from-green-50 to-emerald-50 border-3 md:border-4 border-green-500 p-4 md:p-6 lg:p-8 rounded-2xl md:rounded-3xl shadow-xl md:shadow-2xl hover:shadow-green-400/20 transition-all duration-300">
                                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-red-800 mb-4 md:mb-6 flex items-center">
                                    <span className="bg-red-800 text-yellow-400 rounded-full w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 flex items-center justify-center text-base md:text-lg lg:text-xl font-black mr-3 md:mr-6">3</span>
                                    Vai trò hỗ trợ – không thay thế
                                </h3>
                                <ul className="space-y-3 md:space-y-4 text-sm md:text-base lg:text-lg">
                                    <li className="flex items-start bg-white/80 rounded-lg md:rounded-xl p-3 md:p-4 border-2 border-green-200">
                                        <span className="text-green-500 mr-3 md:mr-4 mt-0.5 md:mt-1 text-lg md:text-2xl">✓</span>
                                        <span className="text-red-700">AI chỉ hỗ trợ tạo minh họa/đồ họa; nội dung học thuật do sinh viên biên soạn.</span>
                                    </li>
                                    <li className="flex items-start bg-white/80 rounded-lg md:rounded-xl p-3 md:p-4 border-2 border-green-200">
                                        <span className="text-green-500 mr-3 md:mr-4 mt-0.5 md:mt-1 text-lg md:text-2xl">✓</span>
                                        <span className="text-red-700">Text, trích dẫn, lập luận đều trải qua biên tập thủ công và đối chiếu nguồn.</span>
                                    </li>
                                    <li className="flex items-start bg-white/80 rounded-lg md:rounded-xl p-3 md:p-4 border-2 border-green-200">
                                        <span className="text-green-500 mr-3 md:mr-4 mt-0.5 md:mt-1 text-lg md:text-2xl">✓</span>
                                        <span className="text-red-700">Không dùng AI để tạo giả mạo tư liệu lịch sử hay thay đổi ngữ cảnh tài liệu.</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Ô 4 - Quy trình kiểm tra */}
                            <div className="w-full mx-auto bg-gradient-to-r from-blue-50 to-indigo-50 border-3 md:border-4 border-blue-500 p-4 md:p-8 lg:p-10 rounded-2xl md:rounded-3xl shadow-xl md:shadow-2xl hover:shadow-blue-400/20 transition-all duration-300">
                                <h3 className="text-xl md:text-3xl lg:text-4xl font-bold text-red-800 mb-4 md:mb-6 lg:mb-8 flex items-center">
                                    <span className="bg-red-800 text-yellow-400 rounded-full w-8 h-8 md:w-10 md:h-10 lg:w-14 lg:h-14 flex items-center justify-center text-base md:text-xl lg:text-2xl font-black mr-3 md:mr-6 lg:mr-8">4</span>
                                    Quy trình kiểm tra và đảm bảo chất lượng
                                </h3>
                                <div className="space-y-4 md:space-y-6">
                                    <div className="bg-white/95 rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8 border-2 md:border-3 border-blue-200 shadow-md md:shadow-lg">
                                        <div className="flex items-start gap-3 md:gap-6">
                                            <div className="text-3xl md:text-4xl lg:text-6xl flex-shrink-0">🏷️</div>
                                            <div className="flex-1">
                                                <h4 className="text-blue-700 font-bold text-lg md:text-xl lg:text-2xl mb-2 md:mb-4">Ghi nhãn và đánh dấu nguồn gốc</h4>
                                                <ul className="text-blue-600 text-sm md:text-base lg:text-lg space-y-1 md:space-y-2">
                                                    <li className="flex items-start gap-2 md:gap-3">
                                                        <span className="text-blue-500 text-base md:text-xl mt-0.5">•</span>
                                                        <span>Gắn tag "AI-generated" trong metadata của tệp hình ảnh</span>
                                                    </li>
                                                    <li className="flex items-start gap-2 md:gap-3">
                                                        <span className="text-blue-500 text-base md:text-xl mt-0.5">•</span>
                                                        <span>Thêm watermark hoặc chú thích góc ảnh khi cần thiết</span>
                                                    </li>
                                                    <li className="flex items-start gap-2 md:gap-3">
                                                        <span className="text-blue-500 text-base md:text-xl mt-0.5">•</span>
                                                        <span>Ghi rõ alt text để phân biệt với hình ảnh thật</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white/95 rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8 border-2 md:border-3 border-blue-200 shadow-md md:shadow-lg">
                                        <div className="flex items-start gap-3 md:gap-6">
                                            <div className="text-3xl md:text-4xl lg:text-6xl flex-shrink-0">🔍</div>
                                            <div className="flex-1">
                                                <h4 className="text-blue-700 font-bold text-lg md:text-xl lg:text-2xl mb-2 md:mb-4">Kiểm duyệt nội dung và chất lượng</h4>
                                                <ul className="text-blue-600 text-sm md:text-base lg:text-lg space-y-1 md:space-y-2">
                                                    <li className="flex items-start gap-2 md:gap-3">
                                                        <span className="text-blue-500 text-base md:text-xl mt-0.5">•</span>
                                                        <span>Lọc và loại bỏ nội dung có thể gây hiểu lầm hoặc nhạy cảm</span>
                                                    </li>
                                                    <li className="flex items-start gap-2 md:gap-3">
                                                        <span className="text-blue-500 text-base md:text-xl mt-0.5">•</span>
                                                        <span>Đảm bảo prompt phù hợp với ngữ cảnh học thuật</span>
                                                    </li>
                                                    <li className="flex items-start gap-2 md:gap-3">
                                                        <span className="text-blue-500 text-base md:text-xl mt-0.5">•</span>
                                                        <span>Kiểm tra tính chính xác của hình ảnh so với mô tả</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white/95 rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8 border-2 md:border-3 border-blue-200 shadow-md md:shadow-lg">
                                        <div className="flex items-start gap-3 md:gap-6">
                                            <div className="text-3xl md:text-4xl lg:text-6xl flex-shrink-0">📝</div>
                                            <div className="flex-1">
                                                <h4 className="text-blue-700 font-bold text-lg md:text-xl lg:text-2xl mb-2 md:mb-4">Lưu trữ và theo dõi</h4>
                                                <ul className="text-blue-600 text-sm md:text-base lg:text-lg space-y-1 md:space-y-2">
                                                    <li className="flex items-start gap-2 md:gap-3">
                                                        <span className="text-blue-500 text-base md:text-xl mt-0.5">•</span>
                                                        <span>Ghi nhật ký prompt và thông số tạo để truy vết</span>
                                                    </li>
                                                    <li className="flex items-start gap-2 md:gap-3">
                                                        <span className="text-blue-500 text-base md:text-xl mt-0.5">•</span>
                                                        <span>Lưu phiên bản gốc và các chỉnh sửa sau đó</span>
                                                    </li>
                                                    <li className="flex items-start gap-2 md:gap-3">
                                                        <span className="text-blue-500 text-base md:text-xl mt-0.5">•</span>
                                                        <span>Tạo báo cáo tổng hợp việc sử dụng AI cho từng project</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-red-900 border-t border-yellow-400/20 py-8">
                    <div className="container mx-auto px-4 text-center">
                        <p className="text-yellow-100 mb-4">© 2026 - Tôn giáo trong thời kỳ quá độ lên chủ nghĩa xã hội - Nhóm 5 - AI1807</p>
                        <p className="text-yellow-300 text-sm">"Sống tốt đời, đẹp đạo" - Phương châm của đồng bào có đạo</p>
                    </div>
                </footer>

                {/* Nút lên đầu trang - Fixed position */}
                {showBackTop && (
                    <button
                        onClick={scrollToTop}
                        className="fixed bottom-8 right-8 bg-yellow-400 hover:bg-yellow-500 text-red-900 rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-50"
                        aria-label="Lên đầu trang"
                    >
                        <ArrowRight className="w-6 h-6 transform -rotate-90" />
                    </button>
                )}
            </div>
        </div>
    )
}

export default App