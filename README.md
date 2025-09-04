# AdRemix AI - Base Mini App

An AI-powered application that generates multiple social media ad variations from a single product image and automatically posts them to TikTok and Instagram test accounts.

## Features

- 🎯 **AI Ad Generation**: Upload a product image and receive 3-5 distinct ad creative variations
- 📱 **Platform-Specific Optimization**: Tailored for TikTok and Instagram with native platform styling
- 🚀 **Automated Social Posting**: Direct posting to connected test accounts
- 💰 **Micro-transaction Model**: Pay-per-generation for cost-effective testing
- 🔗 **Base Integration**: Built on Base network with OnchainKit wallet integration

## Quick Start

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Fill in your API keys:
   - OnchainKit API key from Coinbase Developer Platform
   - OpenAI API key (or OpenRouter for cost savings)

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000)

## Architecture

### Data Model
- **User**: Stores user profile and connected social accounts
- **AdBatch**: Contains generated ad variations and metadata
- **SocialAccount**: Manages OAuth tokens for platform integration

### Tech Stack
- **Frontend**: Next.js 15, React 18, TailwindCSS
- **Blockchain**: Base network via OnchainKit
- **AI**: OpenAI GPT-4 Vision and DALL-E 3
- **Authentication**: Privy wallet integration
- **Social APIs**: TikTok for Developers, Instagram Graph API

## API Integration

### Required APIs
1. **OpenAI API** - Image generation and ad copy creation
2. **TikTok for Developers API** - Auto-posting to TikTok
3. **Instagram Graph API** - Auto-posting to Instagram  
4. **OnchainKit** - Base network wallet integration

## Business Model

- **Micro-transactions**: $5 per batch of 3-5 ad variations
- **Pay-per-posting**: Small fee for auto-posting to platforms
- **Future**: Subscription tiers and token-gated features

## Development

### File Structure
```
app/
├── components/           # Reusable UI components
├── api/                 # API routes
├── globals.css          # Global styles
├── layout.tsx           # App layout
├── page.tsx            # Main page
└── providers.tsx       # Context providers
```

### Environment Variables
See `.env.example` for required configuration.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details.
