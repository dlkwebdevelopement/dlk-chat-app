export const chatsData = [
  {
    id: '1',
    name: 'Project Alpha',
    message: 'Arun: Ready for the stand-up?',
    time: '2:30 PM',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alpha',
    unread: 2,
    status: 'typing',
    isGroup: true,
    messages: [
      { id: '1', sender: 'Arun Kumar', text: 'Hey! Ready for the stand-up?', timestamp: '2:25 PM', isOwn: false, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Arun' },
      { id: '2', sender: 'You', text: 'Yes, I am! Let me just finish this task.', timestamp: '2:27 PM', isOwn: true },
      { id: '3', sender: 'Arun Kumar', text: 'Perfect! Meeting room is set up.', timestamp: '2:28 PM', isOwn: false, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Arun' },
      { id: '4', sender: 'Arun Kumar', text: 'We can start whenever you are ready 🚀', timestamp: '2:29 PM', isOwn: false, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Arun' },
      { id: '5', sender: 'You', text: 'Great! On my way now.', timestamp: '2:30 PM', isOwn: true },
    ]
  },
  {
    id: '2',
    name: 'Priya Sharma',
    message: 'Please review the ticket.',
    time: '1:15 PM',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
    unread: 0,
    status: 'online',
    isGroup: false,
    messages: [
      { id: '1', sender: 'Priya Sharma', text: 'Hey, did you get a chance to look at the PR?', timestamp: '1:10 PM', isOwn: false, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya' },
      { id: '2', sender: 'You', text: 'Just starting on it now.', timestamp: '1:12 PM', isOwn: true },
      { id: '3', sender: 'Priya Sharma', text: 'Please review the ticket.', timestamp: '1:15 PM', isOwn: false, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya' },
    ]
  },
  {
    id: '3',
    name: 'Sales Team',
    message: 'Kumar: Meeting starts in 5 mins.',
    time: '11:45 AM',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SalesTeam',
    unread: 5,
    status: 'offline',
    isGroup: true,
    messages: [
      { id: '1', sender: 'Anjali', text: 'Are we hitting the Q3 targets?', timestamp: '11:30 AM', isOwn: false, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anjali' },
      { id: '2', sender: 'Rahul', text: 'We are very close. Just need to close the Acme deal.', timestamp: '11:35 AM', isOwn: false, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul' },
      { id: '3', sender: 'You', text: 'I can help with the presentation.', timestamp: '11:40 AM', isOwn: true },
      { id: '4', sender: 'Kumar', text: 'Meeting starts in 5 mins.', timestamp: '11:45 AM', isOwn: false, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kumar' },
    ]
  },
  {
    id: '4',
    name: 'Amit Verma',
    message: 'Thanks for the update!',
    time: 'Yesterday',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amit',
    unread: 0,
    status: 'offline',
    isGroup: false,
    messages: [
      { id: '1', sender: 'You', text: 'The servers have been rebooted.', timestamp: 'Yesterday', isOwn: true },
      { id: '2', sender: 'Amit Verma', text: 'Thanks for the update!', timestamp: 'Yesterday', isOwn: false, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amit' },
    ]
  },
  {
    id: '5',
    name: 'Design Team',
    message: 'You: Love the new mockups! 👏',
    time: 'Yesterday',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Design',
    unread: 0,
    status: 'online',
    isGroup: true,
    messages: [
      { id: '1', sender: 'Sara', text: 'I just uploaded the Figma links.', timestamp: 'Yesterday', isOwn: false, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sara' },
      { id: '2', sender: 'You', text: 'Love the new mockups! 👏', timestamp: 'Yesterday', isOwn: true },
    ]
  },
];
