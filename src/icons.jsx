// icons.jsx — tiny stroke icon set
const I = {};

const mk = (path, opts = {}) => (props) => {
  const { size = 14, ...rest } = props || {};
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={opts.sw || 1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...rest}
    >
      {path}
    </svg>
  );
};

I.Search = mk(<><circle cx="11" cy="11" r="6.5" /><path d="M20 20l-3.6-3.6" /></>);
I.Folder = mk(<path d="M3.5 6.5a2 2 0 0 1 2-2h3.2l2 2H18.5a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2v-11z" />);
I.FolderOpen = mk(<><path d="M3.5 6.5a2 2 0 0 1 2-2h3.2l2 2H18.5a2 2 0 0 1 2 2v1.5" /><path d="M3.5 9.5h18l-2.4 8.2a2 2 0 0 1-1.9 1.3H5.4a2 2 0 0 1-1.9-1.5L3.5 9.5z" /></>);
I.Chat = mk(<path d="M4 5.5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-7.5L6 19v-3.5h-0a2 2 0 0 1-2-2v-8z" />);
I.Plus = mk(<><path d="M12 5v14" /><path d="M5 12h14" /></>);
I.Caret = mk(<path d="M9 6l6 6-6 6" />);
I.Dots = mk(<><circle cx="6" cy="12" r="1.1" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.1" fill="currentColor" stroke="none"/><circle cx="18" cy="12" r="1.1" fill="currentColor" stroke="none"/></>);
I.Pin = mk(<><path d="M9 3l6 6-2 2 1 6-4-3-5 5 5-5-3-4 2-2 6-6z" /></>, { sw: 1.4 });
I.Star = mk(<path d="M12 4l2.5 5.2 5.7.8-4.1 4 .9 5.8L12 17l-5 2.8.9-5.8L3.8 10l5.7-.8L12 4z" />);
I.Settings = mk(<><circle cx="12" cy="12" r="2.5" /><path d="M19.4 13.5a7.5 7.5 0 0 0 0-3l1.6-1.2-1.5-2.6-1.9.6a7.5 7.5 0 0 0-2.6-1.5l-.4-2H9.4l-.4 2A7.5 7.5 0 0 0 6.4 7.3l-1.9-.6L3 9.3l1.6 1.2a7.5 7.5 0 0 0 0 3L3 14.7l1.5 2.6 1.9-.6a7.5 7.5 0 0 0 2.6 1.5l.4 2h5.2l.4-2a7.5 7.5 0 0 0 2.6-1.5l1.9.6 1.5-2.6-1.6-1.2z" /></>);
I.Inbox = mk(<><path d="M3.5 4.5h17v9h-4.5l-1.2 2.5h-5.6L8 13.5H3.5v-9z" /><path d="M3.5 13.5v5a1.5 1.5 0 0 0 1.5 1.5h14a1.5 1.5 0 0 0 1.5-1.5v-5" /></>);
I.Bookmark = mk(<path d="M6 4h12v17l-6-4-6 4V4z" />);
I.Tag = mk(<><path d="M3.5 11V4.5h6.5l10 10-6.5 6.5-10-10z" /><circle cx="8" cy="8" r="1.4" /></>);
I.Hash = mk(<><path d="M4.5 9h15" /><path d="M4.5 15h15" /><path d="M10 4l-2 16" /><path d="M16 4l-2 16" /></>);
I.Sparkle = mk(<><path d="M12 3l1.5 5L18 9.5 13.5 11 12 16l-1.5-5L6 9.5 10.5 8 12 3z" /><path d="M19 16l.7 2.2L22 19l-2.3.8L19 22l-.7-2.2L16 19l2.3-.8.7-2.2z" /></>);
I.Bolt = mk(<path d="M13 3L5 13.5h6L10 21l8-10.5h-6L13 3z" />);
I.Trash = mk(<><path d="M4 7h16" /><path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" /><path d="M5.5 7l1 13a1.5 1.5 0 0 0 1.5 1.4h8a1.5 1.5 0 0 0 1.5-1.4l1-13" /></>);
I.Grip = mk(<><circle cx="9" cy="6" r="1" fill="currentColor"/><circle cx="9" cy="12" r="1" fill="currentColor"/><circle cx="9" cy="18" r="1" fill="currentColor"/><circle cx="15" cy="6" r="1" fill="currentColor"/><circle cx="15" cy="12" r="1" fill="currentColor"/><circle cx="15" cy="18" r="1" fill="currentColor"/></>);
I.Clock = mk(<><circle cx="12" cy="12" r="8" /><path d="M12 7v5l3 2" /></>);
I.Check = mk(<path d="M5 12l4.5 4.5L19 7" />);
I.Filter = mk(<path d="M4 5h16l-6 8v5l-4 2v-7L4 5z" />);
I.Layers = mk(<><path d="M12 3l9 5-9 5-9-5 9-5z"/><path d="M3 13l9 5 9-5"/><path d="M3 17l9 5 9-5"/></>);
I.Cmd = mk(<path d="M9 6a3 3 0 1 1 3 3H6a3 3 0 1 0 3-3v12a3 3 0 1 1-3-3h12a3 3 0 1 0-3 3V6z" />);
I.Arrow = mk(<><path d="M5 12h14" /><path d="M13 6l6 6-6 6" /></>);
I.Mic = mk(<><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0 0 14 0" /><path d="M12 18v3" /></>);
I.Map = mk(<><path d="M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2V6z"/><path d="M9 4v14"/><path d="M15 6v14"/></>);
I.Bell = mk(<><path d="M6 16V10a6 6 0 0 1 12 0v6l1.5 2h-15L6 16z"/><path d="M10 20a2 2 0 0 0 4 0"/></>);
I.User = mk(<><circle cx="12" cy="8" r="3.5" /><path d="M5 20c1-3.5 3.5-5 7-5s6 1.5 7 5"/></>);
I.Globe = mk(<><circle cx="12" cy="12" r="8"/><path d="M3.5 12h17"/><path d="M12 3.5a14 14 0 0 1 0 17"/><path d="M12 3.5a14 14 0 0 0 0 17"/></>);
I.Workspace = mk(<><rect x="3.5" y="4.5" width="17" height="6" rx="1.5"/><rect x="3.5" y="13.5" width="17" height="6" rx="1.5"/></>);
I.Doc = mk(<><path d="M6 3.5h8l4 4v13H6v-17z"/><path d="M14 3.5v4h4"/><path d="M9 12h6"/><path d="M9 15h6"/><path d="M9 18h4"/></>);
I.Brain = mk(<path d="M9 5a3 3 0 0 0-3 3v1a3 3 0 0 0-2 3 3 3 0 0 0 2 3v1a3 3 0 0 0 3 3h1V5H9zm5 0v15h1a3 3 0 0 0 3-3v-1a3 3 0 0 0 2-3 3 3 0 0 0-2-3V8a3 3 0 0 0-3-3h-1z"/>);
I.Project = mk(<><rect x="3.5" y="5.5" width="17" height="13" rx="2"/><path d="M3.5 9.5h17"/><circle cx="6.5" cy="7.5" r="0.6" fill="currentColor"/></>);
I.Refresh = mk(<><path d="M4 9a8 8 0 0 1 14-3l2 2"/><path d="M20 4v4h-4"/><path d="M20 15a8 8 0 0 1-14 3l-2-2"/><path d="M4 20v-4h4"/></>);
I.Eye = mk(<><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></>);
I.Lock = mk(<><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></>);
I.Calendar = mk(<><rect x="3.5" y="5.5" width="17" height="14" rx="1.5"/><path d="M3.5 10h17"/><path d="M8 3.5v4"/><path d="M16 3.5v4"/></>);
I.Code = mk(<><path d="M9 7l-5 5 5 5"/><path d="M15 7l5 5-5 5"/></>);
I.Image = mk(<><rect x="3.5" y="4.5" width="17" height="15" rx="1.5"/><circle cx="9" cy="10" r="2"/><path d="M20.5 16l-5-5-9 8.5"/></>);

window.I = I;
