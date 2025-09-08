import { useState } from 'react'
import './BrowseModal.css'

// Import icons with exact file names you provided
import GmailIcon from '../../assets/icons/gmail.svg?react'
import HubspotIcon from '../../assets/icons/hubspot.svg?react'
import OutlookIcon from '../../assets/icons/outlook.svg?react'
import NotionIcon from '../../assets/icons/notion.svg?react'
import GDriveIcon from '../../assets/icons/g-drive.svg?react'
import GSheetIcon from '../../assets/icons/g-sheet.svg?react'
import DropboxIcon from '../../assets/icons/dropbox.svg?react'
import TrelloIcon from '../../assets/icons/trello.svg?react'
import FigmaIcon from '../../assets/icons/figma.svg?react'
import ElevenlabsIcon from '../../assets/icons/elevenlabs.svg?react'
import CopilotIcon from '../../assets/icons/copilot.svg?react'
import N8Icon from '../../assets/icons/n8n.svg?react'
import NvidiaIcon from '../../assets/icons/nvidia.svg?react'
import OpenaiIcon from '../../assets/icons/openai.svg?react'
import OpenrouterIcon from '../../assets/icons/openrouter.svg?react'
import PerplexityIcon from '../../assets/icons/perplexity.svg?react'
import HuggingfaceIcon from '../../assets/icons/huggingface.svg?react'
import MetaIcon from '../../assets/icons/meta.svg?react'
import MicrosoftIcon from '../../assets/icons/microsoft.svg?react'
import MidjourneyIcon from '../../assets/icons/midjourney.svg?react'

const BrowseModal = ({ isOpen, onClose }) => {
  const allApps = [
    { name: 'Gmail', Icon: GmailIcon },
    { name: 'HubSpot', Icon: HubspotIcon },
    { name: 'Outlook', Icon: OutlookIcon },
    { name: 'Notion', Icon: NotionIcon },
    { name: 'Google Drive', Icon: GDriveIcon },
    { name: 'Google Sheets', Icon: GSheetIcon },
    { name: 'Dropbox', Icon: DropboxIcon },
    { name: 'Trello', Icon: TrelloIcon },
    { name: 'Figma', Icon: FigmaIcon },
    { name: 'ElevenLabs', Icon: ElevenlabsIcon },
    { name: 'Copilot', Icon: CopilotIcon },
    { name: 'n8n', Icon: N8Icon },
    { name: 'Nvidia', Icon: NvidiaIcon },
    { name: 'OpenAI', Icon: OpenaiIcon },
    { name: 'OpenRouter', Icon: OpenrouterIcon },
    { name: 'Perplexity', Icon: PerplexityIcon },
    { name: 'HuggingFace', Icon: HuggingfaceIcon },
    { name: 'Meta', Icon: MetaIcon },
    { name: 'Microsoft', Icon: MicrosoftIcon },
    { name: 'Midjourney', Icon: MidjourneyIcon }
  ];

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Browse All Integrations</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-body">
          <p style={{ color: 'var(--gray-600)', marginBottom: 'var(--space-4)' }}>
            Connect with all your favorite apps and services
          </p>
          
          <div className="app-grid">
            {allApps.map((app, index) => (
              <div key={index} className="app-grid-item">
                <div className="app-icon-container">
                  <app.Icon style={{ width: '32px', height: '32px' }} />
                </div>
                <span className="app-name">{app.name}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>
            Close
          </button>
          <button className="btn-primary">
            Request New Integration
          </button>
        </div>
      </div>
    </div>
  );
};

export default BrowseModal;
