/**
 * Gallery Data Store
 * Central place to manage all artwork for featured & gallery pages
 */

const galleryData = {
    // Personal artwork
    personal: [
        {
            id: 'personal-001',
            title: 'Facetime Your Homie',
            description: 'A cool piece I made',
            image: 'https://i.redd.it/b7ysmh65mu3b1.jpg',
            thumbnail: 'https://i.redd.it/b7ysmh65mu3b1.jpg',
            date: '2023-06-10',
            tags: ['Digital', 'Character'],
            featured: true,
            link: 'https://www.reddit.com/r/furry/comments/13zlmua/facetime_your_homie_klaude_here/'
        },
        // Add more personal artwork:
        {
            id: 'personal-002',
            title: 'Artwork Title',
            description: 'Description of the piece',
            image: 'assets/art/personal/image.png',
            thumbnail: 'assets/art/personal/thumbs/image.png',
            date: 'YYYY-MM-DD',
            tags: ['Tag1', 'Tag2'],
            featured: true,
            link: null
        },
    ],

    // Commission work
    commissions: [
        // Add commissions:
        {
            id: 'comm-001',
            title: 'Commission Title',
            description: 'Commission for a client',
            image: 'assets/art/commissions/image.png',
            thumbnail: 'assets/art/commissions/thumbs/image.png',
            date: 'YYYY-MM-DD',
            tags: ['Commission', 'Character'],
            featured: false,
            link: null,
            client: 'Client Name'
        },
    ]
};
