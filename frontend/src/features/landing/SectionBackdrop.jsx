function IconWrap({ className = "", children }) {
  return (
    <div
      className={`absolute scale-[1.2] text-white/10 drop-shadow-[0_0_10px_rgba(255,255,255,0.08)] md:scale-[1.35] ${className}`}
      aria-hidden="true"
    >
      {children}
    </div>
  );
}

export default function SectionBackdrop({ variant = "default" }) {
  const variants = {
    default: (
      <>
        <IconWrap className="top-[9%] left-[6%] rotate-[-8deg]">
          <svg
            className="h-12 w-12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v13.5m0 0 4.5-4.5M12 16.5 7.5 12"
            />
          </svg>
        </IconWrap>
        <IconWrap className="top-[14%] right-[9%] rotate-[12deg]">
          <svg
            className="h-10 w-10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 1.5l7.5 4.5v12L12 22.5l-7.5-4.5v-12L12 1.5z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8.25v7.5m-3-4.5 3 4.5 3-4.5"
            />
          </svg>
        </IconWrap>
        <IconWrap className="bottom-[12%] left-[14%] rotate-[6deg]">
          <svg
            className="h-14 w-14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 17.25V6.75A2.25 2.25 0 0 1 5.25 4.5h13.5A2.25 2.25 0 0 1 21 6.75v10.5A2.25 2.25 0 0 1 18.75 19.5H5.25A2.25 2.25 0 0 1 3 17.25Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.5 15.75h2.25m4.5 0h2.25M7.5 11.25h9"
            />
          </svg>
        </IconWrap>
        <IconWrap className="right-[18%] bottom-[17%] rotate-[-10deg]">
          <svg
            className="h-11 w-11"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 20.25v-15A1.5 1.5 0 0 1 6 3.75h12a1.5 1.5 0 0 1 1.5 1.5v15"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 7.5h7.5m-7.5 4.5h7.5m-7.5 4.5h4.5"
            />
          </svg>
        </IconWrap>
        <IconWrap className="top-[20%] left-[34%] rotate-[15deg]">
          <svg
            className="h-8 w-8"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25v19.5" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12h19.5" />
          </svg>
        </IconWrap>
        <IconWrap className="top-[72%] right-[31%] rotate-[-14deg]">
          <svg
            className="h-9 w-9"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 8.25h15" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75h15" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5v15" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 4.5v15" />
          </svg>
        </IconWrap>
        <IconWrap className="right-[44%] bottom-[28%] rotate-[8deg]">
          <svg
            className="h-7 w-7"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 6h15M4.5 12h15M4.5 18h15" />
          </svg>
        </IconWrap>
        <IconWrap className="top-[58%] left-[24%] rotate-[-18deg]">
          <svg
            className="h-8 w-8"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15" />
          </svg>
        </IconWrap>
        <IconWrap className="top-[52%] right-[18%] rotate-[18deg]">
          <svg
            className="h-8 w-8"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 6 6 18" />
          </svg>
        </IconWrap>
        <IconWrap className="top-[16%] left-[48%] rotate-[24deg]">
          <svg
            className="h-7 w-7"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 4.5h15v15h-15z" />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 8.25h7.5M8.25 12h7.5M8.25 15.75h4.5"
            />
          </svg>
        </IconWrap>
        <IconWrap className="bottom-[12%] left-[58%] rotate-[-20deg]">
          <svg
            className="h-8 w-8"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 2.25A9.75 9.75 0 1 0 21.75 12 9.76 9.76 0 0 0 12 2.25Z"
            />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
          </svg>
        </IconWrap>
      </>
    ),
    process: (
      <>
        <IconWrap className="top-[12%] left-[7%] rotate-[-8deg]">
          <svg
            className="h-12 w-12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.1"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h9v9h-9z" />
          </svg>
        </IconWrap>
        <IconWrap className="top-[16%] right-[11%] rotate-[11deg]">
          <svg
            className="h-10 w-10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.1"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12" />
          </svg>
        </IconWrap>
        <IconWrap className="bottom-[12%] left-[13%] rotate-[8deg]">
          <svg
            className="h-14 w-14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 6.75h15M4.5 12h15M4.5 17.25h15"
            />
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 4.5v15" />
          </svg>
        </IconWrap>
        <IconWrap className="right-[19%] bottom-[19%] rotate-[-8deg]">
          <svg
            className="h-11 w-11"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3.75a8.25 8.25 0 1 0 8.25 8.25"
            />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5v5.25l3 1.75" />
          </svg>
        </IconWrap>
        <IconWrap className="top-[34%] left-[33%] rotate-[14deg]">
          <svg
            className="h-8 w-8"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 8.25h15M4.5 15.75h15" />
          </svg>
        </IconWrap>
        <IconWrap className="right-[28%] bottom-[32%] rotate-[-12deg]">
          <svg
            className="h-9 w-9"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h9v9h-9z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75h4.5v4.5h-4.5z" />
          </svg>
        </IconWrap>
        <IconWrap className="top-[56%] left-[24%] rotate-[-16deg]">
          <svg
            className="h-8 w-8"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15" />
          </svg>
        </IconWrap>
        <IconWrap className="top-[54%] right-[18%] rotate-[15deg]">
          <svg
            className="h-8 w-8"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 6h15M4.5 18h15" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 6v12" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 6v12" />
          </svg>
        </IconWrap>
        <IconWrap className="top-[18%] left-[48%] rotate-[20deg]">
          <svg
            className="h-7 w-7"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3.75v16.5" />
          </svg>
        </IconWrap>
        <IconWrap className="right-[54%] bottom-[14%] rotate-[-18deg]">
          <svg
            className="h-7 w-7"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 4.5h15v15h-15z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5l9 9" />
          </svg>
        </IconWrap>
      </>
    ),
    infrastructure: (
      <>
        <IconWrap className="top-[11%] left-[7%] rotate-[-9deg]">
          <svg
            className="h-12 w-12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.1"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 6.75h15v10.5h-15z" />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 10.5h.75m3 0h.75m3 0h.75M8.25 14.25h7.5"
            />
          </svg>
        </IconWrap>
        <IconWrap className="top-[17%] right-[9%] rotate-[10deg]">
          <svg
            className="h-10 w-10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 2.25l7.5 4.5v10.5l-7.5 4.5-7.5-4.5V6.75l7.5-4.5z"
            />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75v10.5" />
          </svg>
        </IconWrap>
        <IconWrap className="bottom-[12%] left-[13%] rotate-[7deg]">
          <svg
            className="h-14 w-14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.1"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 18.75h15" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 18.75V9.75h10.5v9" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 9.75V6h6v3.75" />
          </svg>
        </IconWrap>
        <IconWrap className="right-[18%] bottom-[20%] rotate-[-8deg]">
          <svg
            className="h-11 w-11"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 12.75l4.5-4.5 4.5 4.5 4.5-4.5 3 3"
            />
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 19.5h16.5" />
          </svg>
        </IconWrap>
        <IconWrap className="top-[28%] left-[33%] rotate-[13deg]">
          <svg
            className="h-8 w-8"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15" />
          </svg>
        </IconWrap>
        <IconWrap className="right-[31%] bottom-[34%] rotate-[-14deg]">
          <svg
            className="h-9 w-9"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h12v12H6z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 9h6v6H9z" />
          </svg>
        </IconWrap>
        <IconWrap className="top-[58%] left-[26%] rotate-[-18deg]">
          <svg
            className="h-8 w-8"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3.75v16.5" />
          </svg>
        </IconWrap>
        <IconWrap className="top-[52%] right-[19%] rotate-[16deg]">
          <svg
            className="h-8 w-8"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 6 6 18" />
          </svg>
        </IconWrap>
        <IconWrap className="top-[17%] left-[50%] rotate-[22deg]">
          <svg
            className="h-7 w-7"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 6.75h15v10.5h-15z" />
          </svg>
        </IconWrap>
        <IconWrap className="right-[52%] bottom-[14%] rotate-[-17deg]">
          <svg
            className="h-7 w-7"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5h15" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 19.5V8.25h12V19.5" />
          </svg>
        </IconWrap>
      </>
    ),
    faq: (
      <>
        <IconWrap className="top-[16%] left-[8%] rotate-[-7deg]">
          <svg
            className="h-12 w-12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.1"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75h.008v.008H12v-.008Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15.75v-1.5a3 3 0 1 0-3-3" />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12a7.5 7.5 0 1 1 15 0 7.5 7.5 0 0 1-15 0Z"
            />
          </svg>
        </IconWrap>
        <IconWrap className="top-[22%] right-[10%] rotate-[10deg]">
          <svg
            className="h-10 w-10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.1"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h9m-9 4.5h6m-6 4.5h4.5" />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 3.75h12A2.25 2.25 0 0 1 20.25 6v12A2.25 2.25 0 0 1 18 20.25H8.25L3.75 21V6A2.25 2.25 0 0 1 6 3.75Z"
            />
          </svg>
        </IconWrap>
        <IconWrap className="bottom-[14%] left-[14%] rotate-[7deg]">
          <svg
            className="h-14 w-14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.1"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v4.5M12 15v4.5" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12h10.5" />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 2.25A9.75 9.75 0 1 0 21.75 12 9.76 9.76 0 0 0 12 2.25Z"
            />
          </svg>
        </IconWrap>
        <IconWrap className="right-[19%] bottom-[18%] rotate-[-8deg]">
          <svg
            className="h-11 w-11"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.1"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 6h15M4.5 12h9M4.5 18h6" />
          </svg>
        </IconWrap>
        <IconWrap className="top-[30%] left-[34%] rotate-[12deg]">
          <svg
            className="h-8 w-8"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 2.25a9.75 9.75 0 1 0 9.75 9.75A9.76 9.76 0 0 0 12 2.25Z"
            />
          </svg>
        </IconWrap>
        <IconWrap className="right-[31%] bottom-[30%] rotate-[-10deg]">
          <svg
            className="h-9 w-9"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 4.5h15v15h-15z" />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 8.25h7.5M8.25 12h7.5M8.25 15.75h4.5"
            />
          </svg>
        </IconWrap>
        <IconWrap className="top-[57%] left-[24%] rotate-[-16deg]">
          <svg
            className="h-8 w-8"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15" />
          </svg>
        </IconWrap>
        <IconWrap className="top-[54%] right-[18%] rotate-[14deg]">
          <svg
            className="h-8 w-8"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h12v12H6z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 9h6v6H9z" />
          </svg>
        </IconWrap>
        <IconWrap className="top-[18%] left-[48%] rotate-[18deg]">
          <svg
            className="h-7 w-7"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 6h15M4.5 12h9M4.5 18h6" />
          </svg>
        </IconWrap>
        <IconWrap className="right-[54%] bottom-[14%] rotate-[-20deg]">
          <svg
            className="h-7 w-7"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 2.25A9.75 9.75 0 1 0 21.75 12 9.76 9.76 0 0 0 12 2.25Z"
            />
          </svg>
        </IconWrap>
      </>
    ),
    footer: (
      <>
        <IconWrap className="top-[14%] left-[7%] rotate-[-8deg]">
          <svg
            className="h-12 w-12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.1"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5h15" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 19.5V4.5l6 6 6-6v15" />
          </svg>
        </IconWrap>
        <IconWrap className="top-[20%] right-[10%] rotate-[12deg]">
          <svg
            className="h-10 w-10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 7.5h16.5M6 7.5v12m12-12v12"
            />
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 7.5v12m6-12v12" />
          </svg>
        </IconWrap>
        <IconWrap className="bottom-[16%] left-[14%] rotate-[7deg]">
          <svg
            className="h-14 w-14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.1"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25v19.5M2.25 12h19.5" />
          </svg>
        </IconWrap>
        <IconWrap className="right-[18%] bottom-[18%] rotate-[-9deg]">
          <svg
            className="h-11 w-11"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3.75l7.5 4.5v7.5l-7.5 4.5-7.5-4.5v-7.5l7.5-4.5Z"
            />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v7.5" />
          </svg>
        </IconWrap>
        <IconWrap className="top-[34%] left-[33%] rotate-[13deg]">
          <svg
            className="h-8 w-8"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3.75v16.5" />
          </svg>
        </IconWrap>
        <IconWrap className="right-[31%] bottom-[34%] rotate-[-12deg]">
          <svg
            className="h-9 w-9"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 8.25h12M6 12h12M6 15.75h8.25"
            />
          </svg>
        </IconWrap>
        <IconWrap className="top-[56%] left-[24%] rotate-[-16deg]">
          <svg
            className="h-8 w-8"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15" />
          </svg>
        </IconWrap>
        <IconWrap className="top-[54%] right-[18%] rotate-[16deg]">
          <svg
            className="h-8 w-8"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 6 6 18" />
          </svg>
        </IconWrap>
        <IconWrap className="top-[18%] left-[48%] rotate-[22deg]">
          <svg
            className="h-7 w-7"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 6.75h15v10.5h-15z" />
          </svg>
        </IconWrap>
        <IconWrap className="right-[54%] bottom-[14%] rotate-[-18deg]">
          <svg
            className="h-7 w-7"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 4.5h15v15h-15z" />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 8.25h7.5M8.25 12h7.5M8.25 15.75h4.5"
            />
          </svg>
        </IconWrap>
      </>
    ),
  };

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-95">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(15,23,42,0.18),transparent_45%),radial-gradient(circle_at_bottom,rgba(2,6,23,0.35),transparent_40%)]" />
      {variants[variant] ?? variants.default}
    </div>
  );
}
