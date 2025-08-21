import json
import os
from typing import Dict, Any, Optional
from pathlib import Path

def load_json_data(file_path: str) -> Dict[str, Any]:
    """
    Load JSON data from a file
    
    Args:
        file_path: Path to the JSON file
        
    Returns:
        Dictionary containing the JSON data or empty dict if file not found
    """
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            return json.load(file)
    except Exception as e:
        print(f"Error loading data from {file_path}: {e}")
        return {}

def get_project_root() -> Path:
    """
    Get the project root directory
    
    Returns:
        Path object representing the project root
    """
    # This assumes utils.py is in the app directory which is in the backend directory
    return Path(__file__).parent.parent

def get_data_path(filename: str) -> str:
    """
    Get the full path to a data file
    
    Args:
        filename: Name of the file in the data directory
        
    Returns:
        Full path to the data file
    """
    root = get_project_root()
    return os.path.join(root.parent, "data", filename)

def get_env_variable(name: str, default: Optional[str] = None) -> str:
    """
    Get an environment variable or return a default value
    
    Args:
        name: Name of the environment variable
        default: Default value if environment variable is not set
        
    Returns:
        Value of the environment variable or default
    """
    return os.environ.get(name, default)

def format_project_data(project: Dict[str, Any]) -> str:
    """
    Format project data for chat response
    
    Args:
        project: Dictionary containing project data
        
    Returns:
        Formatted string representation of the project
    """
    formatted = f"**{project.get('title', 'Untitled Project')}**\n"
    formatted += f"{project.get('description', 'No description available')}\n"
    
    if 'technologies' in project and project['technologies']:
        formatted += f"Technologies: {', '.join(project['technologies'])}\n"
        
    if 'github_link' in project and project['github_link']:
        formatted += f"GitHub: {project['github_link']}\n"
        
    if 'highlights' in project and project['highlights']:
        formatted += "Highlights:\n"
        for highlight in project['highlights']:
            formatted += f"- {highlight}\n"
            
    return formatted + "\n"

def format_skills_data(skills: Dict[str, Any]) -> str:
    """
    Format skills data for chat response
    
    Args:
        skills: Dictionary containing skills data by category
        
    Returns:
        Formatted string representation of skills
    """
    if not skills:
        return "No skills information available."
        
    formatted = "Skills:\n"
    for category, skill_list in skills.items():
        formatted += f"- {category}: {', '.join(skill_list)}\n"
        
    return formatted